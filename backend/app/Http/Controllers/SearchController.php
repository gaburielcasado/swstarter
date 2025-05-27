<?php

namespace App\Http\Controllers;

use App\Events\SearchPerformed;
use App\Exceptions\SwapiRequestException;
use App\Http\Requests\SearchRequest;
use App\Services\SearchService;
use Illuminate\Routing\Controller;

class SearchController extends Controller
{
    protected SearchService $searchService;

    public function __construct(SearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    public function search(SearchRequest $request)
    {
        $query = $request->validated('q');
        $type = $request->validated('type');

        SearchPerformed::dispatch($type, $query);

        try {
            $results = $this->searchService->search($type, $query);
            return response()->json($results);
        } catch (SwapiRequestException $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'details' => $e->getResponseBody(),
            ], $e->getCode() ?: 500);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'unexpected server error',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
