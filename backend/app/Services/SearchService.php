<?php

namespace App\Services;

use App\Models\Character;
use App\Models\Film;
use Illuminate\Support\Collection;

class SearchService
{
    /**
     * Perform a local search against the database and return normalized results.
     *
     * @param  string  $type  One of 'character' or 'film'
     * @param  string  $query
     * @return Collection  Array of ['id' => string, 'title' => string]
     */
    public function search(string $type, string $query): Collection
    {
        return match ($type) {
            'character' => $this->searchCharacters($query),
            'film' => $this->searchFilms($query),
            default => throw new \InvalidArgumentException("Invalid type: {$type}"),
        };
    }

    protected function searchCharacters(string $query): Collection
    {
        return Character::where('name', 'like', "%{$query}%")
            ->get()
            ->map(fn($character) => [
                'id' => "character-{$character->uid}",
                'title' => $character->name,
            ]);
    }

    protected function searchFilms(string $query): Collection
    {
        return Film::where('title', 'like', "%{$query}%")
            ->get()
            ->map(fn($film) => [
                'id' => "film-{$film->uid}",
                'title' => $film->title,
            ]);
    }
}
