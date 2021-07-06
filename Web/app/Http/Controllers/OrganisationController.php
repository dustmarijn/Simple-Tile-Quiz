<?php

namespace App\Http\Controllers;

use App\Models\Organisation;
use App\Models\Page;
use App\Models\Tile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class OrganisationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $organisations = Organisation::all();

        return response(['organisations' => $organisations]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if($request->name) {
            $org = new Organisation();
            $org->name = $request->name;
            if ($request->hasFile('logo_file_name')) {

                $this->validate($request, [

                    'logo_file_name' => 'required|mimes:jpg,jpeg,png,bmp,tif,svg'

                ]);

                $file = $request->file('logo_file_name');
                $filename = $file->getClientOriginalName();

                $path = public_path('/images/organisationlogo/');

                if (!file_exists($path . '' . $filename)) {
                    $file->move($path, $filename);
                }
                $org->logo_file_name = $filename;

                if($request->phone) {
                    $org->phone_number = $request->phone;
                    if($request->email) {
                        $org->email = $request->email;
                        if($request->location) {
                            $org->location = $request->location;
                            if($request->website) {
                                $org->website = $request->website;

                                $org->save();

                                return response(['succesMessage' => 'Organisatie is aangemaakt!'], 200);
                            }
                        }
                    }
                }
            }
        } else {
            return response(['errorMessage' => 'Er is iets mis gegaan!'], 500);
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
     * @param  \App\Models\Organisation  $organisation
     * @return \Illuminate\Http\Response
     */
    public function show(Organisation $organisation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Organisation  $organisation
     * @return \Illuminate\Http\Response
     */
    public function edit(Organisation $organisation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Organisation  $organisation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Organisation $organisation)
    {
        $org = Organisation::where('id', intval($request->id))->first();
        if($org) {
            $tile = Tile::where('title', $org->name)->first();
            if($request->name !== 'null') {
                $org->name = $request->name;
                $tile->title = $request->name;
            }
            if($request->hasFile('logo_file_name')) {
                $this->validate($request, [

                    'logo_file_name' => 'required|mimes:jpg,jpeg,png,bmp,tif,svg'

                ]);

                $file = $request->file('logo_file_name');
                $filename = $file->getClientOriginalName();

                $path = public_path('/images/organisationlogo/');

                if (!file_exists($path . '' . $filename)) {
                    $file->move($path, $filename);
                }
                $org->logo_file_name = $filename;
                $tile->illustration_file_name = $filename;
            }
            if($request->phone !== 'null') {
                $org->phone_number = $request->phone;
            }
            if($request->email !== 'null') {
                $org->email = $request->email;
            }
            if($request->location !== 'null') {
                $org->location = $request->location;
            }
            if($request->website !== 'null') {
                $org->website = $request->website;
            }
            $tile->save();
            $org->save();

            return response(['succesMessage' => 'Organisatie is aangepast en opgeslagen!'], 200);
        } else {
            return response(['errorMessage' => 'Er is iets mis gegaan!'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Tile $tile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $org = Organisation::where('id', intval($request->id))->first();
        if($org) {
            $page = Page::where('title', $org->name)->first();
            $tiles = Tile::all()->where('title', $org->name);
            $org->delete();
            if($tiles) {
                foreach($tiles as $tile) {
                    $tile->delete();
                }
            }
            if($page) {
                foreach($tiles as $tile) {
                    $tile->delete();
                }
                $page->tiles()->delete();
                if($page->id !== 1) {
                    $page->delete();
                }
            }
            return response(['succesMessage' => 'Organisatie en bijbehorende pagina\'s zijn verwijderd.'], 200);
        } else {
            return response(['errorMessage' => 'Organisatie kon niet worden gevonden.'], 500);
        }
    }
}
