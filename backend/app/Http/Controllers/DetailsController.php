<?php

namespace App\Http\Controllers;

use App\Exceptions\SwapiRequestException;
use App\Services\DetailsService;
use Illuminate\Routing\Controller;

class DetailsController extends Controller
{
    protected DetailsService $detailsService;

    public function __construct(DetailsService $detailsService)
    {
        $this->detailsService = $detailsService;
    }

    public function show(string $id)
    {
        try {
            $results = $this->detailsService->fetchDetails($id);
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