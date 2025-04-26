import { Injectable } from '@angular/core';
import { openDB } from 'idb'; // Use idb library if installed, else use the native IndexedDB

@Injectable({
  providedIn: 'root'
})
export class LocaldbService {
  private dbName = 'localDB';
  private storeName = 'userStore';

  constructor() {
    this.initDb();
  }

  // Initialize IndexedDB
  private async initDb() {
    const db = await openDB(this.dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('userStore')) {

