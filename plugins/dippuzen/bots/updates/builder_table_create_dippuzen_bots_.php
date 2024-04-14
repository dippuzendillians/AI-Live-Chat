<?php namespace Dippuzen\Bots\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateDippuzenBots extends Migration
{
    public function up()
    {
        Schema::create('dippuzen_bots_', function($table)
        {
            $table->increments('id')->unsigned();
            $table->text('website');
            $table->mediumText('crawl_data');
            $table->integer('user_id');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('dippuzen_bots_');
    }
}
