# CivSim

Quick overview: 

Gaia is the entity manager. 

It is responsible for managing 'spawned' entities, and uses 
SpawnStrategy (with only a single strategy implemented) to test 
for valid locations when spawning.

Entities themselves are designed to be a collection of easily
extendable/substitute-able parts. For instance, the drawing of
an entity is delegated to a member of class Shape, which
can be subclassed to provide unique draw instructions.

This would be extended in the future to allow for invisible
entities, still managed by 'Gaia,' and support for any number of
shapes of different sizes. 'Cities' may spawn smaller objects which
have their own instruction set.