<?php namespace Dippuzen\Bots\Components;

use Cms\Classes\ComponentBase;
use Dippuzen\Bots\Models\Bot as Bot;

/**
 * Update Component
 *
 * @link https://docs.octobercms.com/3.x/extend/cms-components.html
 */
class Update extends ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'update Component',
            'description' => 'Update Bot'
        ];
    }
    
    public function updateItemAndRenderPartial($bot_id, $data, $duration, $totalPages) {
        // Call the model's update method
        $result = Bot::updateItem($bot_id, $data, $duration, $totalPages);
        
        // If the model update was successful, render the partial and return its HTML
        if ($result) {
            return ['#content' => $this->renderPartial('@default.htm')];
        } else {
            // Handle the error case
        }
    }

    /**
     * @link https://docs.octobercms.com/3.x/element/inspector-types.html
     */
    public function defineProperties()
    {
        return [];
    }
}
