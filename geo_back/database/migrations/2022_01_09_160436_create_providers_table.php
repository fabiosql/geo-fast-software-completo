<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("provider");
            $table->string("provider_id");
            $table->bigInteger("id_user")->unsigned()->unique();
            $table->string("avatar")->nullable();
            $table->timestamps();

            $table->foreign("id_user")->references("id")->on("users")->onDelete("cascade")->onUpdate("no action");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('providers');
    }
}
