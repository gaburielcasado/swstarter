<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('swapi:sync')->daily();

Schedule::command('search:stats')
    ->everyFiveMinutes()
    ->then(function () {
        \Log::info('[Scheduler] search:stats task was executed.');
    });