<?php

namespace App\Http\Controllers;

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
        if($request->title) { // Checks if the title of the tile is requested.

            $tile = new Tile(); // Creates new tile.
            $tile->title = $request->title; // Title of the tile.
            if($request->illustration_file_name) {
                if($request->path) { // Checks if the tile path from the tile is requested.
                    if(!Tile::all()->where('path', $request->path)) {

                        $tile->path = $request->path; // Sets the path of the tile to the requested path.
                        if ($request->able_to_use) { // Checks if the able to use of the tile is requested.

                            $tile->able_to_use = $request->able_to_use; // Sets the able to use of the requested able to use.
                            if($request->page_id) {

                                $tile->page_id = intval($request->page_id); // Sets the id from the relation adminpage.
                                $tile->save(); // Saves the tile in the database.

                                return response(['succesMessage' => 'Keuze tegel succesvol aangemaakt!']);
                            } else {
                                return response(['errorMessage' => 'Keuze tegel kon niet worden aangemaakt, de keuze tegel moet toebehoren aan een pagina!']);
                            }

                        } else {
                            return response(['errorMessage' => 'Keuze tegel kon niet worden aangemaakt, je moet aangeven of de keuze tegel kan worden gebruikt!']);
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tile  $tile
     * @return \Illuminate\Http\Response
     */
    public function show(Tile $tile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tile  $tile
     * @return \Illuminate\Http\Response
     */
    public function edit(Tile $tile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tile  $tile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tile $tile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tile  $tile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tile $tile)
    {
        //
    }
}
