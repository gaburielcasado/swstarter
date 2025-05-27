<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ComputeSearchStats extends Command
{
    protected $signature = 'search:stats';
    protected $description = 'Compute and cache search statistics';

    public function handle()
    {
        try {
            $total = DB::table('search_logs')->count();

            $topQueries = DB::table('search_logs')
                ->select('query', DB::raw('count(*) as count'))
                ->groupBy('query')
                ->orderByDesc('count')
                ->limit(5)
                ->get()
                ->map(
                    fn($item) =>
                    [
                        'query' => $item->query,
                        'count' => $item->count,
                        'percentage' => round($item->count / $total * 100, 2),
                    ]
                );

            $byHour = DB::table('search_logs')
                ->select(DB::raw('HOUR(created_at) as hour'), DB::raw('count(*) as count'))
                ->groupBy('hour')
                ->orderByDesc('count')
                ->first();

            $stats = [
                'top_queries' => $topQueries,
                'most_active_hour' => $byHour?->hour,
                'computed_at' => now()->toISOString(),
            ];

            Cache::put('search_stats', $stats);
        } catch (\Throwable $e) {
            \Log::error('[search:stats] Error: ' . $e->getMessage(), [
                'exception' => $e,
            ]);
        }
    }
}
