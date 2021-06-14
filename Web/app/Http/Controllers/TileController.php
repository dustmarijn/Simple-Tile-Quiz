<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Tile;
use Illuminate\Http\Request;

class TileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if ($request->title) { // Checks if the title of the tile is requested.

            $tile = new Tile(); // Creates new tile.
            $tile->title = $request->title; // Title of the tile.
            if ($request->file('illustration_file_name')) {

                $this->validate($request, [

                    'illustration_file_name' => 'required|mimes:jpg,jpeg,png,bmp,tif,svg'

                ]);

                $file = $request->file('illustration_file_name');
                $filename = $file->getClientOriginalName();

                $path = '/images/illustrations/';

                if (!file_exists($path . '' . $filename)) {
                    $file->move($path, $filename);
                }

                if ($request->path) { // Checks if the tile path from the tile is requested.
                    if (Tile::all()->where('path', $request->path)) {

                        $tile->path = $request->path; // Sets the path of the tile to the requested path.

                        if ($request->page_id) {

                            $tile->illustration_file_name = $filename;
                            $tile->able_to_use = "true";
                            $tile->page_id = intval($request->page_id); // Sets the id from the relation adminpage.
                            $tile->save(); // Saves the tile in the database.

                            return response(['succesMessage' => 'Keuze tegel succesvol aangemaakt!']);
                        } else {
                            return response(['errorMessage' => 'Keuze tegel kon niet worden aangemaakt, de keuze tegel moet toebehoren aan een pagina!']);
                        }

                    } else {
                        return response(['errorMessage' => 'Keuze tegel kon niet worden aangemaakt, er is al een keuze tegel die naar dit pad gaat!']);
                    }
                } else {
                    return response(['errorMessage' => 'Keuze tegel kon niet worden aangemaakt, je moet een pad aangeven waar deze keuze tegel komt!']);
                }
            } else {
                return response(['errorMessage' => 'Keuze tegel kon niet worden aangemaakt, er moet een illustratie bij zitten!']);
            }
        } else {
            return response(['errorMessage' => 'Keuze tegel kon niet worden aangemaakt, je moet wel een titel toevoegen!']);
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
     * @param \App\Models\Tile $tile
     * @return \Illuminate\Http\Response
     */
    public function show(Tile $tile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Tile $tile
     * @return \Illuminate\Http\Response
     */
    public function edit(Tile $tile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Tile $tile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tile $tile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Tile $tile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $tile = Tile::all()->where('id', intval($request->id))->first();
        if($tile) {
            $page = Page::all()->where('path', $tile->path)->first();
            if($page) {
                $tile->delete();
                $page->tiles()->delete();
                if($page->id !== 1) {
                    $page->delete();
                }
                return response(['succesMessage' => 'Tile en bijbehorende pagina\'s zijn verwijderd.']);
            } else {
                return response(['errorMessage' => 'Pagina van de tegel kon niet worden gevonden']);
            }
        } else {
            return response(['errorMessage' => 'Keuze tegel kon niet worden gevonden.']);
        }
    }
}
