<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeolocationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('geolocation', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("lat");
            $table->string("lng");
            $table->bigInteger("id_vehicle")->unsigned();
            $table->dateTime("created_at")->useCurrent();
            $table->dateTime("updated_at")->useCurrentOnUpdate()->nullable();
            $table->foreign("id_vehicle")->references("id")->on("user_vehicle")->onDelete("cascade")->onUpdate("no action");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('geolocation');
    }
}
