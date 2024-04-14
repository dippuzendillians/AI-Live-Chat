<?php namespace Dippuzen\Bots\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateDippuzenBots extends Migration
{
    public function up()
    {
        Schema::table('dippuzen_bots_', function($table)
        {
            $table->integer('bot_id');
        });
    }
    
    public function down()
    {
        Schema::table('dippuzen_bots_', function($table)
        {
            $table->dropColumn('bot_id');
        });
    }
}
