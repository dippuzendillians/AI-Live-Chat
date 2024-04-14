<?php namespace Dippuzen\Bots\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateDippuzenBots2 extends Migration
{
    public function up()
    {
        Schema::table('dippuzen_bots_', function($table)
        {
            $table->integer('total_pagea');
            $table->text('duration');
        });
    }
    
    public function down()
    {
        Schema::table('dippuzen_bots_', function($table)
        {
            $table->dropColumn('total_pagea');
            $table->dropColumn('duration');
        });
    }
}
