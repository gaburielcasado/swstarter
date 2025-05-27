<?php

namespace App\Exceptions;

use Exception;

class SwapiRequestException extends Exception
{
    protected string $responseBody;

    public function __construct(string $message, int $statusCode, string $responseBody = '')
    {
        parent::__construct($message, $statusCode);
        $this->responseBody = $responseBody;
    }

    public function getResponseBody(): string
    {
        return $this->responseBody;
    }
}
