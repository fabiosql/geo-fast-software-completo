<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("users", function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("email", 150);
            $table->string("password")->nullable();
            $table->string("full_name", 60)->nullable();
            $table->integer("plan_id");
            $table->set("status", ["active", "inactive"]);
            $table->dateTime("created_at")->useCurrent();
            $table->dateTime("updated_at")->useCurrentOnUpdate()->nullable();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("users");
    }
}
