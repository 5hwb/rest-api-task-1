const { Location } = require("../api/models/locationModel");
const { Spaceship } = require("../api/models/spaceshipModel");

describe('Model Test Cases', () => {
  let location1 = new Location(10, "Skydust", "Pluto", 2);
  let location2 = new Location(11, "Outer Rings", "Saturn", 1);

  let spaceship1 = new Spaceship(1, "Galactic Superstar 1", "Qwertytron 9000", location1);
  let spaceship2 = new Spaceship(2, "Outer Space Maestro 2", "Qwertytron 7000", location1);

  it('location1 should have 2 spaceships registered', async () => {
    expect(location1.spaceshipRegistry.size).toEqual(2);
    expect(location1.spaceshipRegistry.has(spaceship1.id)).toEqual(true);
    expect(location1.spaceshipRegistry.has(spaceship2.id)).toEqual(true);
  });

  it('location2 should have 0 spaceships registered', async () => {
    expect(location2.spaceshipRegistry.size).toEqual(0);
  });

  //////////////////////////////////////////////////
  // Unit tests for addIncomingSpaceship()
  //////////////////////////////////////////////////

  it('should add an incoming spaceship', async () => {
    let dummyLoc = new Location(12, "A City", "Mars", 5);
    let locationUnderTest = new Location(13, "Some remote outpost", "Mars", 1);
    let aSpaceship = new Spaceship(3, "Old thingo", "1st Gen Skycar (2030)", dummyLoc);

    expect(locationUnderTest.addIncomingSpaceship(aSpaceship)).toBe(true);
    expect(locationUnderTest.spaceshipRegistry.size).toEqual(1);
  });

  it('should not add an incoming spaceship if capacity of location has been exceeded', async () => {
    let dummyLoc = new Location(12, "A City", "Mars", 5);
    let locationUnderTest = new Location(13, "Some remote outpost", "Mars", 1);
    let aSpaceship = new Spaceship(3, "Old thingo", "1st Gen Skycar (2030)", dummyLoc);
    let anotherSpaceship = new Spaceship(4, "Old thingo2", "1st Gen Skycar (2030)", dummyLoc);

    // locationUnderTest has a capacity of 1 spaceship.
    // After adding a spaceship, it should not add another spaceship
    expect(locationUnderTest.addIncomingSpaceship(aSpaceship)).toBe(true);
    expect(locationUnderTest.addIncomingSpaceship(anotherSpaceship)).toBe(false);
    expect(locationUnderTest.spaceshipRegistry.size).toEqual(1);
  });

  it('should not add the same spaceship again', async () => {
    let dummyLoc = new Location(12, "A City", "Mars", 5);
    let locationUnderTest = new Location(13, "Some remote outpost", "Mars", 1);
    let aSpaceship = new Spaceship(3, "Old thingo", "1st Gen Skycar (2030)", dummyLoc);

    expect(locationUnderTest.addIncomingSpaceship(aSpaceship)).toBe(true);
    expect(locationUnderTest.addIncomingSpaceship(aSpaceship)).toBe(false);
    expect(locationUnderTest.spaceshipRegistry.size).toEqual(1);
  });

  it('should not add undefined or null spaceships', async () => {
    let locationUnderTest = new Location(13, "Some remote outpost", "Mars", 1);
    let aNullSpaceship = undefined;
    let aNullSpaceship2 = null;

    expect(locationUnderTest.addIncomingSpaceship(aNullSpaceship)).toBe(false);
    expect(locationUnderTest.addIncomingSpaceship(aNullSpaceship2)).toBe(false);
  });

  //////////////////////////////////////////////////
  // Integration tests for removeOutgoingSpaceship()
  //////////////////////////////////////////////////

  it('should remove an outgoing spaceship', async () => {
    let dummyLoc = new Location(12, "A City", "Mars", 5);
    let locationUnderTest = new Location(13, "Some remote outpost", "Mars", 1);
    let aSpaceship = new Spaceship(3, "Old thingo", "1st Gen Skycar (2030)", dummyLoc);

    expect(locationUnderTest.addIncomingSpaceship(aSpaceship)).toBe(true);
    expect(locationUnderTest.removeOutgoingSpaceship(aSpaceship)).toBe(true);
    expect(locationUnderTest.spaceshipRegistry.size).toEqual(0);
  });

  it('should not remove the same spaceship again', async () => {
    let dummyLoc = new Location(12, "A City", "Mars", 5);
    let locationUnderTest = new Location(13, "Some remote outpost", "Mars", 1);
    let aSpaceship = new Spaceship(3, "Old thingo", "1st Gen Skycar (2030)", dummyLoc);

    expect(locationUnderTest.addIncomingSpaceship(aSpaceship)).toBe(true);
    expect(locationUnderTest.removeOutgoingSpaceship(aSpaceship)).toBe(true);
    expect(locationUnderTest.removeOutgoingSpaceship(aSpaceship)).toBe(false);
    expect(locationUnderTest.spaceshipRegistry.size).toEqual(0);
  });

  it('should not remove undefined or null spaceships', async () => {
    let dummyLoc = new Location(12, "A City", "Mars", 5);
    let locationUnderTest = new Location(13, "Some remote outpost", "Mars", 1);
    let aSpaceship = new Spaceship(3, "Old thingo", "1st Gen Skycar (2030)", dummyLoc);
    let aNullSpaceship = undefined;
    let aNullSpaceship2 = null;

    expect(locationUnderTest.addIncomingSpaceship(aSpaceship)).toBe(true);
    expect(locationUnderTest.removeOutgoingSpaceship(aNullSpaceship)).toBe(false);
    expect(locationUnderTest.removeOutgoingSpaceship(aNullSpaceship2)).toBe(false);
    expect(locationUnderTest.spaceshipRegistry.size).toEqual(1);
  });

});