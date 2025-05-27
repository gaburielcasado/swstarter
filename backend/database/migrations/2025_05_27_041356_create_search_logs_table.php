<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('search_logs', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('query');
            $table->timestamp('created_at');
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('search_logs');
    }
};
