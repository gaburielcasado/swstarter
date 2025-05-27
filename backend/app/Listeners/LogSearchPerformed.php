<?php

namespace App\Listeners;

use App\Events\SearchPerformed;
use Illuminate\Support\Facades\DB;

class LogSearchPerformed
{
    public function handle(SearchPerformed $event)
    {
        DB::table('search_logs')->insert([
            'type' => $event->type,
            'query' => $event->query,
            'created_at' => now(),
        ]);
    }
}
