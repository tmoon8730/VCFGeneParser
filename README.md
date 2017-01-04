# VCFGeneParser

This is a simple project for parsing VCF files with gene information with a Python script and searching it through a NodeJS website. The VCF file is commonly used for transferring gene data and this tool easily stores the data in a MongoDB database for easier analysis than the flat file VCF.

## Installation

The first step to installing this project is to clone this repository from [GitHub](https://github.com/tmoon8730/VCFGeneParser). Then install the dependencies for the NodeJS website by changing to the GeneViewer directory with `cd GeneViewer` and then run `npm install`. Also a [MongoDB database](https://www.mongodb.com/) is needed for this project. After downloading install the database and run it with the default setup.

## Usage
There are three parts to the project: the Python vcf file script, and the NodeJS Express website, and the MongoDB database

### VCF Python Script
The `vcf.py` file is used to parse the vcf file into the MongoDB database. First make sure the MongoDB database is up and running. Then use the command `python vcf.py -i <inputfile>` where the `<inputfile>` is the filename of the vcf file.

### NodeJS Express Website
The NodeJS Express site is located in the GeneViewer directory. To start the server either run `node server.js` from the GeneViewer directory or run `./VCFGeneParser.sh` from the project root directory. The server will be up and running at `127.0.0.1:8888`

### MongoDB Database
The MongoDB Database can be started by using `mongod` and the database will be saved in the default file location in `/var/data/`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request and put Tyler Moon as the reviewer :D

## History

### January 2017
- Created the initial project

## Credits

Tyler Moon

## License

Copyright 2017 Tyler Moon

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
