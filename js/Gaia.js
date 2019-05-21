"use strict";
/****************************************************************
 * Author: Adam Wallace
 * Date: 5/21/2019
 * Desc: Includes classes for Entities, objects with position
         and radius, and the EntityTester that tests Entities' 
         present or reqeuested state.
 ****************************************************************/
const ENTITY_SPAWN_ATTEMPT_LIMIT = 300;

/**
 * Manages all entities and their spawning.
 */
class Gaia {
    /**
     * Initializes Gaia and its tester class delegate.
     */
    constructor() {
        this.entitySet = new Set();
        this.tester = new SpawnStrategy(this);
    }

    /**
     * Runs test battery on entity, and adds it to entitySet if
     * they pass. If it fails, attempts a random nearby location
     * up to 'ENTITY_RESPAWN_ATTEMPT_LIMIT' times.
     * 
     * @param {Entity} entity
     * @returns Bool
     */
    spawn(entity) {
        if (this.tester.runCitySpawnTests(entity)) {
            this.entitySet.add(entity);
            return true;
        }
        else {
            return this.spawnRec(entity, 1);
        }
    }

    /**
     * Handles additional spawn attempts up to 'ENTITY_SPAWN_ATTEMPT_LIMIT'.
     *
     * @param {Entity} entity 
     * @param {Number} n current attempt #
     * @returns Bool
     */
    spawnRec(entity, n) {
        if (n < ENTITY_SPAWN_ATTEMPT_LIMIT) {
            entity.x += (Math.random * entity.rad) * (Math.random() < .5 ? 1 : (-1));
            entity.y += (Math.random * entity.rad) * (Math.random() < .5 ? 1 : (-1));
            if (this.tester.runCitySpawnTests(entity)) {
                    this.entitySet.add(entity);
                    return true;
            }
            else {
                return this.spawnRec(entity, n + 1);
            }
        }
        return false;
    }
}


/**
 * Strategy design pattern implementation for selecting test battery based
 * on entity instanceof, with the additional option to run a specified
 * battery of tests. 
 */
class SpawnStrategy {
    /**
     * Define Gaia so tester can reference Gaia.entitySet.
     *
     * @param {Gaia} gaia 
     */
    constructor(gaia) {
        this.tester = new EntityTester(gaia);
    }

    /**
     * Run test battery associated with City spawning on entity.
     *
     * @param {City} entity
     * @returns Bool
     */
    runCitySpawnTests(entity) {
        return this.tester.runTests(
            [
                this.tester.testWillNotCollideWithExisting(entity.x, entity.y, entity.rad),
                this.tester.testWillEntityBeInBounds(entity.x, entity.y, entity.rad),
                this.tester.testMinDistanceBetweenAny(entity.x, entity.y,
                    entity.rad, CITY_SPAWN_SEPERATION)
            ]);
    }

    /**
     * Runs any collection of tests passed as arguments.
     *
     * @param  {...Bool} tests
     * @returns Bool
     */
    runTests(...tests) {
        return tester.runTests(tests);
    }
}