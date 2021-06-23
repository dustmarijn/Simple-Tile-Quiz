<?php

namespace App\Http\Controllers;

use App\Models\Organisation;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Organisation  $organisation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Organisation $organisation)
    {
        //
    }
}
