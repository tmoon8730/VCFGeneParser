//
//  ViewController.swift
//  GeneDriver
//
//  Created by Tyler Moon on 1/4/17.
//  Copyright © 2017 Tyler Moon. All rights reserved.
//

import Cocoa

class ViewController: NSViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }
    @IBOutlet weak var filename_field: NSTextField!
    @IBOutlet weak var output_field: NSTextField!
    @IBAction func browseFile(_ sender: AnyObject) {
        let dialog = NSOpenPanel();
        
        dialog.title                   = "Choose a .vcf file";
        dialog.showsResizeIndicator    = true;
        dialog.showsHiddenFiles        = false;
        dialog.canChooseDirectories    = true;
        dialog.canCreateDirectories    = true;
        dialog.allowsMultipleSelection = false;
        dialog.allowedFileTypes        = ["vcf"];
        
        if (dialog.runModal() == NSModalResponseOK) {
            let result = dialog.url // Pathname of the file
            
            if (result != nil) {
                let path = result!.path
                filename_field.stringValue = path
            }
        } else {
            // User clicked on "Cancel"
            return
        }
    }

    @IBAction func parseFile(_ sender: AnyObject) {
        let fo: FileOperator = FileOperator();
        let dir = fo.readSettingsFile();
        let task = Process()
        switch(sender.tag){
        case 0:
            task.launchPath = "/bin/sh";
            task.arguments = ["\(dir)/GeneViewer/start.sh"];
            print("Starting Website");
            break;
        case 1:
            if(filename_field.stringValue != ""){
                task.launchPath = "/usr/bin/python";
                task.arguments = ["\(dir)/vcf.py", "-i", filename_field.stringValue];
                print("Starting Python");
            }
            break;
        default:
            break;
        }
        let pipe = Pipe();
        task.standardOutput = pipe;
        task.launch();
        let data = pipe.fileHandleForReading.readDataToEndOfFile();
        if let output = NSString(data: data, encoding: String.Encoding.utf8.rawValue) {
            print(output)
            output_field.stringValue = output_field.stringValue + " " + (output as String);
        }
        if(sender.tag == 1){
            task.waitUntilExit();
            let status = task.terminationStatus
            print(status)
        }else{
            print("running")
        }
        
        
    }
}

