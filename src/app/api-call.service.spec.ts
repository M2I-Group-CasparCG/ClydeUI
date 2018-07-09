import { TestBed, inject } from '@angular/core/testing';
import { ApiCallService } from './api-call.service';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';


describe('ApiCallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiCallService,
        HttpClient,
        HttpHandler
      ]
    });
  });


  it('should be created', inject([ApiCallService], (service: ApiCallService) => {
    expect(service).toBeTruthy();
  }));
 });
