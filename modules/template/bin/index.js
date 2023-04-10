#!/usr/bin/env node

"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module CLI
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc CLI class
 */

const {Readable} = require('stream');
const {createWriteStream, existsSync, mkdir, promises} = require('fs');
const MailTemplateClass = require('@afrosintech/mail-template-class');

class CLI extends require("../base") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(CLI);
    // auto invoke methods
    this.autoinvoker(CLI);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    
    this.setMaxListeners(Infinity);
  }



  async path(path = '', base = '/mail') {
    try {
      let dir = path.split('/')
      let filename = dir.pop();
      await promises.mkdir(process.cwd() + base + '/' + dir.join('/'), { recursive: true });
      return process.cwd() + base  + "/" + dir.join('/') + '/' + filename.charAt(0).toUpperCase() + filename.slice(1);;
    } catch (err) {
      console.error(err.message);
    }
  }

fileTitle(string){
  let name = string.replace(/[A-Z]/g, function(s){ return ' ' + s; })
  name  = name.split(' ')
  name.shift();
  return name.join(' ');
}
fileName (path = '', base = '/resources/mail'){
  let dir = path.split('/');
  let filename;
  if(dir.length > 1){
    filename = path.split('/').pop();
  }else{
    filename = path.split('/')[0];
  }
 
  // dir = dir.map(str => str.toLocaleLowerCase());
  // // return  base  + "/" + dir.join('') + this.slugify(filename);
  return this.slugify(dir.join('/')) + '.html';

}
async pathSlug(path = '', base = '/resources/mail') {
  try {
    let dir = path.split('/');
    let filename;
    if(path.split('/').length > 1){
      filename = path.split('/').pop();
      dir.pop();
    }else{
      filename = path.split('/')[0];
    }

    dir = dir.map(str => str.toLocaleLowerCase());
    if(!existsSync(process.cwd() + base + '/' + dir.join(''))){
      
      if(path.split('/').length > 1){
        await promises.mkdir(process.cwd() + base + '/' + dir.join('/'), { recursive: true });
        return process.cwd() + base  + "/" + dir.join('/') + '/' + this.slugify(filename);
      }else{
   
        await promises.mkdir(process.cwd() + base + '/' , { recursive: true });
        // return process.cwd() + base  + "/" + dir.join('')
        return process.cwd() + base  + "/" + this.slugify(filename);
      }
    }else{
      return process.cwd() + base  + "/" + dir.join('/') + '/' + filename.toLocaleLowerCase();
    
    }
  } catch (err) {
    console.error(err.message);

  }
}
createMailTemplate(data = {}, path = '', extension = 'html',json = false,  options = {encoding: 'utf-8'}){
  if(json){
   return this.pathSlug(path).then(filename => {
      if(existsSync(filename + '.' + extension)){
        return console.log(filename.split('/').pop(),'already exists!');
      }
      return Readable.from(JSON.stringify(data)).pipe(createWriteStream(filename  + '.' + extension, options))
    })
  }else{
   return this.pathSlug(path).then(filename => {
      if(existsSync(filename + '.' +  extension)){
        return console.log(filename.split('/').pop(),'already exists!');
      }
      return Readable.from(data).pipe(createWriteStream(filename  + '.' +  extension, options))
    })
  }
}
createView(data = {}, path = '',json = false,  options = {encoding: 'utf-8'}){
  if(json){
    this.pathSlug(path, '/resources/views').then(filename => {
      if(existsSync(filename + '.ejs')){
        return console.log(filename.split('/').pop(),'already exists!');
      }
      Readable.from(JSON.stringify(data)).pipe(createWriteStream(filename  + '.ejs', options))
    })
  }else{
    this.pathSlug(path, '/resources/views').then(filename => {
      if(existsSync(filename + '.ejs')){
        return console.log(filename.split('/').pop(),'already exists!');
      }
      Readable.from(data).pipe(createWriteStream(filename  + '.ejs', options))
    })
  }
}
create(path = '', Mail = MailTemplateClass,json = false,  options = {encoding: 'utf-8'}) {
  let name = this.command(4).split('/').pop();
  let className = name.charAt(0).toUpperCase() + name.slice(1);
  if(json){
    this.path(path).then(filename => {
      if(existsSync(filename + '.js')){
        return console.log(path.split('/').pop(),'already exists!');
      }
      Readable.from(JSON.stringify(Mail({name: className, filename: this.fileName(this.command(4)), module:  this.command(5).split('--')[1] || 'mail-activate'}))).pipe(createWriteStream(filename  + '.js', options))
      console.log(this.command(4), 'mailable created successfully.')
    })
  }else{
   this.path(path).then(filename => {
    if(existsSync(filename + '.js')){
      return console.log(path.split('/').pop(),'already exists!');
    }
    Readable.from(Mail({name: className, filename: this.fileName(this.command(4)), module: this.command(5).split('--')[1] || 'mail-activate'})).pipe(createWriteStream(filename  + '.js', options))
    console.log(this.command(4), 'mailable created successfully.')
   })
  }
}

slugify(string = 'string', delimiter  = '-'){
  string = string.replace(/[A-Z]/g, function(s){ return delimiter + s; });
  string = string.split(delimiter);
  string.shift();
  return string.map(str => str.toLowerCase()).join(delimiter);
}
  command(index = 2){
    return process.argv[index]
 }
 commands(){
  switch(this.command(2)){
      case "make":
        if(this.command(3)){
           switch(this.command(3)){
            case "mail":
               if(this.command(4)){
                  if(this.command(5)){
                    switch(this.command(5)){
                      case '--mail-alert':
                        // string = string.replace(/[A-Z]/g, function(s){ return delimiter + s; });
                        // string = string.split(delimiter);
                        this.create(this.command(4))
                        this.createMailTemplate(`<h1>${this.fileTitle(this.command(4).split('/').pop())}</h1>`, this.command(4));
                        break;
                      case '--mail-activate':
                        this.create(this.command(4))
                        this.createMailTemplate(`<h1>${this.fileTitle(this.command(4).split('/').pop())}</h1>`, this.command(4));
                        break;
                      case '--mail-newsletter':
                        this.create(this.command(4))
                        this.createMailTemplate(`<h1>${this.fileTitle(this.command(4).split('/').pop())}</h1>`, this.command(4));
                        break;
                      case '--mail-billing':
                        this.create(this.command(4))
                        this.createMailTemplate(`<h1>${this.fileTitle(this.command(4).split('/').pop())}</h1>`, this.command(4));
                        break;
                      case '--mail-invoice':
                        this.create(this.command(4))
                        this.createMailTemplate(`<h1>${this.fileTitle(this.command(4).split('/').pop())}</h1>`, this.command(4));
                        break;
                      case '--mail-notification':
                        this.create(this.command(4))
                        this.createMailTemplate(`<h1>${this.fileTitle(this.command(4).split('/').pop())}</h1>`, this.command(4));
                        break;
                      case '--mail-password':
                        this.create(this.command(4))
                        this.createMailTemplate(`<h1>${this.fileTitle(this.command(4).split('/').pop())}</h1>`, this.command(4));
                        break;
                      case '--mail-registration':
                        this.create(this.command(4))
                        this.createMailTemplate(`<h1>${this.fileTitle(this.command(4).split('/').pop())}</h1>`, this.command(4));
                        break;
                      default: 
                        console.log(this.command(5), ' is not a valid option');
                        break;
                    }
                  }else{
                    this.create(this.command(4))
                    this.createMailTemplate(`<h1>${this.fileTitle(this.command(4).split('/').pop())}</h1>`, this.command(4));
                  }
               }else{
                console.log('make mail')
               }
              break;
            case "view":
              if(this.command(4)){
                this.createView( '<h1>Here we go again</h1>', this.command(4))
              }else{
                console.log('make view')
              }
              break;
            default:
              console.log('invalid make option');
              break;
           }
        }else{
          console.log('make mail')
        }
        break;
      case "man":
        console.log('make man page');
        break;
      case "help":
        console.log("help man page");
        break;
      default: 
        console.log("invalid command ...");
        break;
  }
}

  init(){
    this.commands();
  }
  /**
   * @name autoinvoked
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets the list of methods to be auto invoked
   *
   * @return does not return anything
   *
   */

     autoinvoked() {
      return ["init"];
    }

}

module.exports = new CLI;