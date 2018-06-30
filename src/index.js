// if (exports) {
//   var fs = require('fs');
//   var jsdom = require('jsdom').jsdom;
//   var html = fs.readFileSync('./test/index.html', 'utf-8');
//   var document = jsdom(html);
//   window = document.defaultView;
//   var Slideout = require('../');
//   var assert = require('better-assert');
// }
import React from "react";
import ReactDOM from "react-dom";
import Main from "./main";
import "./styles/inline.css";
import "./styles/slideout.css";
import "./styles/data-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Slideout from "slideout"

ReactDOM.render(
  <Main/>, 
  document.getElementById("root")
);

(function(){

  // 'use strict';

  // var doc = window.document;
  // eslint-disable-next-line
  var beforeopenEvent = false;
  // eslint-disable-next-line
  var openEvent = false;
  // eslint-disable-next-line
  var beforecloseEvent = false;
  // eslint-disable-next-line
  var closeEvent = false;

  window.onload = function() {
    document.querySelector('.toggle-button').addEventListener('click', function() {
    slideout.toggle();
    });
  }

  var slideout = new Slideout({
          'panel': document.getElementById('panel'),
          'menu': document.getElementById('menu'),
          'padding': 256,
          'tolerance': 70
        });
  
  var fixed = document.querySelector('.header');

  slideout
    .on('beforeopen', function() {
      fixed.style.transition = 'transform 300ms ease';
      fixed.style.transform = 'translateX(0px)';
      beforeopenEvent = true;
    })
    .on('open', function() {
      fixed.style.transition = '';
      openEvent = true;
    })
    .on('beforeclose', function() {
      fixed.style.transition = 'transform 300ms ease';
      fixed.style.transform = 'translateX(0px)';
      beforecloseEvent = true;
    })
    .on('close', function() {
      fixed.style.transition = '';
      closeEvent = true;
    });

    function close(eve) {
      eve.preventDefault();
      slideout.close();
    }

    slideout
      .on('beforeopen', function() {
        this.panel.classList.add('panel-open');
      })
      .on('open', function() {
        this.panel.addEventListener('click', close);
      })
      .on('beforeclose', function() {
        this.panel.classList.remove('panel-open');
        this.panel.removeEventListener('click', close);
      });

        // var fixed = document.querySelector('.header');

        // // slideout.on('translate', function(translated) {
        // //   fixed.style.transform = 'translateX(' + translated + 'px)';
        // // });

        // slideout.on('beforeopen', function () {
        //   fixed.style.transition = 'transform 300ms ease';
        //   fixed.style.transform = 'translateX(0px)';
        // });

        // slideout.on('beforeclose', function () {
        //   fixed.style.transition = 'transform 300ms ease';
        //   fixed.style.transform = 'translateX(0px)';
        // });

        // slideout.on('open', function () {
        //   fixed.style.transition = '';
        // });

        // slideout.on('close', function () {
        //   fixed.style.transition = '';
        // });

        // function close(eve) {
        //   eve.preventDefault();
        //   slideout.close();
        // }

        // slideout
        //   .on('beforeopen', function() {
        //     this.panel.classList.add('panel-open');
        //   })
        //   .on('open', function() {
        //     this.panel.addEventListener('click', close);
        //   })
        //   .on('beforeclose', function() {
        //     this.panel.classList.remove('panel-open');
        //     this.panel.removeEventListener('click', close);
        //   });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
