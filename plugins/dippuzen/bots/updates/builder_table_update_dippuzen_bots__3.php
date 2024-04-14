<?php namespace Dippuzen\Bots\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateDippuzenBots3 extends Migration
{
    public function up()
    {
        Schema::table('dippuzen_bots_', function($table)
        {
            $table->renameColumn('total_pagea', 'total_pages');
        });
    }
    
    public function down()
    {
        Schema::table('dippuzen_bots_', function($table)
        {
            $table->renameColumn('total_pages', 'total_pagea');
        });
    }
}
