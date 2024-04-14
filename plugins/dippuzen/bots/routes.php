<?php

use Illuminate\Http\Request;
use Dippuzen\Bots\Models\Bot;
use Dippuzen\Bots\Components\Update;
use Response;
use File;


Route::post('api/crawl/{id}', function ($id, Request $request) {
    if ($request->isJson()) {
        $payload = $request->json()->all();
        $updateComponent = new Update;
        $response = $updateComponent->updateItemAndRenderPartial($id, $payload['data'], $payload['duration'], $payload['scraped_items']);

        return response()->json([
            'success' => true,
            'message' => 'Data processed successfully'
        ])->header('Content-Type', 'application/json')
          ->header('Access-Control-Allow-Origin', '*');
    } else {
        return response()->json(['error' => 'Invalid JSON data'], 400)
            ->header('Content-Type', 'application/json')
            ->header('Access-Control-Allow-Origin', '*');
    }
});

Route::get('api/getBot/{id}', function ($id) {
    $bot = Bot::where('bot_id', $id)->first();
    if ($bot) {
        $data = $bot->crawl_data;
        return response()->json($data)
            ->header('Content-Type', 'application/json')
            ->header('Access-Control-Allow-Origin', '*');
    } else {
        return response()->json(['error' => 'Bot not found'], 404)
            ->header('Content-Type', 'application/json')
            ->header('Access-Control-Allow-Origin', '*');
    }
});

Route::get('embed.js', function() {
    $pathToFile = storage_path('app/media/embed.js');
    if (!File::exists($pathToFile)) {
        return response('Not Found', 404)
            ->header('Content-Type', 'text/plain')
            ->header('Access-Control-Allow-Origin', '*');
    }

    $content = File::get($pathToFile);
    return response($content, 200)
        ->header('Content-Type', 'application/javascript')
        ->header('Access-Control-Allow-Origin', '*');
});
