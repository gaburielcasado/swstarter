<?php

use App\Http\Controllers\SearchController;
use App\Http\Controllers\DetailsController;

Route::middleware('api')->group(function () {
    Route::get('/search', [SearchController::class, 'search']);
    Route::get('/details/{id}', [DetailsController::class, 'show']);
    Route::get('/stats', fn() => response()->json(Cache::get('search_stats')));

});
