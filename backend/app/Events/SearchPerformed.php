<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;

class SearchPerformed
{
    use Dispatchable;

    public string $type;
    public string $query;

    public function __construct(string $type, string $query)
    {
        $this->type = $type;
        $this->query = $query;
    }
}
