<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Film;
use App\Models\Character;
use Illuminate\Support\Arr;

class SyncSwapiData extends Command
{
    protected $signature = 'swapi:sync';
    protected $description = 'Sync characters and films from SWAPI into the local database';

    protected string $baseUrl;

    public function __construct()
    {
        parent::__construct();
        $this->baseUrl = config('services.swapi.base_url', 'https://swapi.tech/api');
    }

    public function handle(): void
    {
        $this->info('Starting SWAPI sync...');

        $this->syncCharacters();
        $this->syncFilms();

        $this->info('SWAPI sync completed.');
    }

    protected function syncCharacters(): void
    {
        $this->info('Fetching characters...');

        $next = "{$this->baseUrl}/people?page=1&limit=100&expanded=true";

        while ($next) {
            $response = Http::get($next);

            if (!$response->successful()) {
                $this->error("Failed to fetch characters page: $next");
                break;
            }

            $json = $response->json();
            $results = Arr::get($json, 'results', []);
            $next = Arr::get($json, 'next');

            foreach ($results as $item) {
                $uid = $item['uid'];
                $properties = $item['properties'];

                Character::updateOrCreate(
                    ['uid' => $uid],
                    [
                        'name' => $properties['name'] ?? 'Unknown',
                        'properties' => $properties,
                    ]
                );
            }
        }

        $this->info('Characters synced.');
    }

    protected function syncFilms(): void
    {
        $this->info('Fetching films...');

        $response = Http::get("{$this->baseUrl}/films");

        if (!$response->successful()) {
            $this->error('Failed to fetch films');
            return;
        }

        $films = Arr::get($response->json(), 'result', []);

        foreach ($films as $film) {
            $uid = $film['uid'];
            $properties = $film['properties'];

            $filmModel = Film::updateOrCreate(
                ['uid' => $uid],
                [
                    'title' => $properties['title'] ?? 'Unknown',
                    'properties' => $properties,
                ]
            );

            $characterUrls = $properties['characters'] ?? [];

            $characterUids = collect($characterUrls)->map(
                fn($url) => basename($url)
            );

            $characterIds = Character::whereIn('uid', $characterUids)->pluck('id');

            $filmModel->characters()->sync($characterIds);
        }

        $this->info('Films synced.');
    }
}
