<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Tile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pages = Page::with('tiles')->get();
        return response(['pages' => $pages, 'mobilePages' => $pages])->header('Content-Type', 'text/plain');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if ($request->title) { // Checks if the title of the adminpage is requested.

            $page = new Page(); // Creates new adminpage.
            $page->title = $request->title; // Title of the adminpage.
            if (!Page::where('path', $request->path)->first()) {

                $page->path = str_replace([" ", '(', ')', '[', ']', '<', '>'], "-", $request->path); // Sets the path of the adminpage to the requested path.

                if($request->type) {
                    $page->type = $request->type; // Sets the type of the page (Tile or Organisation).
                }

                $page->save(); // Saves the adminpage in the database.

                return response(['succesMessage' => 'Pagina succesvol aangemaakt!']);
            } else {
                return response(['errorMessage' => 'Pagina kon niet worden aangemaakt, er is al een pagina die naar dit pad gaat!']);
            }
        } else {
            return response(['errorMessage' => 'Pagina kon niet worden aangemaakt, je moet wel een titel toevoegen!']);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        $page = Page::where('id', intval($request->id))->first();;

        return response()->json(['adminpage' => $page, 'mobilePage' => $page]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Page $page
     * @return \Illuminate\Http\Response
     */
    public function edit(Page $page)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $page = Page::where('id', intval($request->page_id))->first();
        $tile = Tile::where('id', intval($request->tile_id))->first();
        if($page) {
            if(!$tile) {
                $tile = Tile::where('title', $page->title)->first();
                if($tile) {
                    if($request->title !== 'null' or $request->title !== null) {
                        $tile->title = $request->title;
                    }
                    if($request->path !== 'null' or $request->path !== null) {
                        if($page->path !== '/') {
                            $tile->path = str_replace([" ", '(', ')', '[', ']', '<', '>'], "-", strtolower($request->path));
                        }
                    }
                    $tile->save();
                }
            }
            if($request->title !== 'null' or $request->title !== null) {
                $page->title = $request->title;
            }
            if($request->path !== 'null' or $request->path !== null) {
                if($page->path !== '/') {
                    $page->path = str_replace([" ", '(', ')', '[', ']', '<', '>'], "-", strtolower($request->path));
                }
            }
            $page->save();
        }
        if($tile) {
            if(!$page) {
                $page = Page::where('title', $tile->title)->first();
                if($page) {
                    if($request->title !== 'null' or $request->title !== null) {
                        $page->title = $request->title;
                    }
                    if($request->path !== 'null' or $request->path !== null) {
                        if($page->path !== '/') {
                            $page->path = str_replace([" ", '(', ')', '[', ']', '<', '>'], "-", strtolower($request->path));
                        }
                    }
                    $page->save();
                }
            }
            if($request->title !== 'null' or $request->title !== null) {
                $tile->title = $request->title;
            }
            if($request->path !== 'null' or $request->path !== null) {
                if($page->path !== '/') {
                    $tile->path = str_replace([" ", '(', ')', '[', ']', '<', '>'], "-", strtolower($request->path));
                }
            }
            if($request->hasFile('illustration_file_name')) {
                $this->validate($request, [

                    'illustration_file_name' => 'required|mimes:jpg,jpeg,png,bmp,tif,svg'

                ]);

                $file = $request->file('illustration_file_name');
                $filename = $file->getClientOriginalName();

                $path = public_path('/images/illustrations');

                if (!file_exists($path . '' . $filename)) {
                    $file->move($path, $filename);
                }

                $tile->illustration_file_name = $filename;
            }
            $tile->save();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Page $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page $page)
    {
        //
    }
}
