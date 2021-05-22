/**
 * Interface for all mock database instances.
 */
 export default interface MockDatabase {

  /**
   * Check if the given string represents a valid ID in the database.
   * @param id The ID to check
   * @param locationDB Database to examine
   * @returns true if an element with given ID is present in the database, false otherwise
   */
  isValidId(id: string): boolean;
  
  /**
   * Get all values in the database.
   * @returns All values in the DB
   */
  getValues(): any[];

  /**
   * Get the element with the given ID.
   * @param id The ID of the element to get
   * @returns The requested element. If ID is not in DB, return undefined. 
   */
  get(id: number): any | undefined;

  /**
   * Add an element to the DB.
   * @param newItem The element to add
   */
  add(newItem: any): void;

  /**
   * Delete the element with the given ID.
   * @param id The ID of the element to delete
   * @returns True if the element was deleted, false otherwise. 
   */
   delete(id: number): boolean;
}