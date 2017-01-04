//
//  SettingsViewController.swift
//  GeneDriver
//
//  Created by Tyler Moon on 1/4/17.
//  Copyright © 2017 Tyler Moon. All rights reserved.
//

import Cocoa

class SettingsViewController: NSViewController {
    @IBOutlet weak var directory_field: NSTextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
    override var representedObject: Any? {
        didSet {
            // Update the view, if already loaded.
        }
    }

    @IBAction func save_button(_ sender: AnyObject) {
        let text = directory_field.stringValue; // Value to save
        let fo: FileOperator = FileOperator();
        fo.writeToSettingsFile(content: text); // Save the text to the settings file
    }
}
