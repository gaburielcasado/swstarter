<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

use App\Events\SearchPerformed;
use App\Listeners\LogSearchPerformed;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        SearchPerformed::class => [
            LogSearchPerformed::class,
        ],
    ];
}
