<?php namespace Dippuzen\Bots\Models;

use Model;

/**
 * Model
 */
class Bot extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var bool timestamps are disabled.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;

    /**
     * @var string table in the database used by the model.
     */
    public $table = 'dippuzen_bots_';

    /**
     * @var array rules for validation.
     */
    public $rules = [
    ];
    
    public static function updateItem($bot_id, array $data,$duration,$totalPages)
    {
        // Find the model instance by ID
        $item = self::where('bot_id', $bot_id)->first();

        if (!$item) {
            return false; // Item not found
        }

        // Serialize the data array to JSON and save it in the 'data' column
        $item->crawl_data = $data;
        $item->duration = $duration;
        $item->total_pages = $totalPages;
        $item->save();
        // Save the model
        return $item->save();
    }
}
