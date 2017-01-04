//
//  FileOperator.swift
//  GeneDriver
//
//  Created by Tyler Moon on 1/4/17.
//  Copyright © 2017 Tyler Moon. All rights reserved.
//

import Foundation

class FileOperator{
    let file = "settings.txt" // File to save and read
    func writeToSettingsFile(content: String){
        
        if let dir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
            let path = dir.appendingPathComponent(file)
            print("Saving settings file to: \(path)")
            // Write to the file
            do{
                try content.write(to: path, atomically: false, encoding: String.Encoding.utf8)
            }catch {
                print("An error occured saving the file")
            }
        }
    }
    
    func readSettingsFile()->String{
        var text = "";
        if let dir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
            let path = dir.appendingPathComponent(file)
            print("Saving settings file to: \(path)")
            // Read from the file
            
            do{
                text = try String(contentsOf: path, encoding: String.Encoding.utf8)
            }catch {
                print("An error occured saving the file")
            }
        }
        return text;
    }
}
