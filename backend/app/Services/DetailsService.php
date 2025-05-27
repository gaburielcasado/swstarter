<?php

namespace App\Services;

use App\Models\Character;
use App\Models\Film;

class DetailsService
{
    public function fetchDetails(string $id): array
    {
        [$type, $uid] = explode('-', $id);

        return match ($type) {
            'character' => $this->normalizeCharacter($uid),
            'film' => $this->normalizeFilm($uid),
            default => throw new \InvalidArgumentException("Invalid type: {$type}"),
        };
    }

    protected function normalizeCharacter(string $uid): array
    {
        $character = Character::with('films')->where('uid', $uid)->firstOrFail();

        $properties = $character->properties;

        $descriptionBody = sprintf(
            "Birth Year: %s\nGender: %s\nEye Color: %s\nHair Color: %s\nHeight: %s\nMass: %s",
            $properties['birth_year'] ?? '-',
            $properties['gender'] ?? '-',
            $properties['eye_color'] ?? '-',
            $properties['hair_color'] ?? '-',
            $properties['height'] ?? '-',
            $properties['mass'] ?? '-'
        );

        $films = $character->films->map(fn($film) => [
            'id' => "film-{$film->uid}",
            'title' => $film->title,
        ])->all();

        return [
            'title' => $character->name,
            'descriptionPanel' => [
                'title' => 'Details',
                'body' => $descriptionBody,
            ],
            'detailLinksPanel' => [
                'title' => 'Movies',
                'items' => $films,
            ],
        ];
    }

    protected function normalizeFilm(string $uid): array
    {
        $film = Film::with('characters')->where('uid', $uid)->firstOrFail();

        $properties = $film->properties;

        $descriptionBody = $properties['opening_crawl'] ?? '-';

        $characters = $film->characters->map(fn($character) => [
            'id' => "character-{$character->uid}",
            'title' => $character->name,
        ])->all();

        return [
            'title' => $film->title,
            'descriptionPanel' => [
                'title' => 'Opening Crawl',
                'body' => $descriptionBody,
            ],
            'detailLinksPanel' => [
                'title' => 'Characters',
                'items' => $characters,
            ],
        ];
    }
}
