class Gaia {
    constructor(context) {
        this.context = context;
        this.entitySet = new Set();
    }

    passesCitySpawnTests(x, y, radius) {
        let tester = new EntityTester(this);
        return tester.runTests(
            tester.testWillNotCollideWithExisting(x, y, radius),
            tester.testWillEntityBeInBounds(x, y, radius),
            tester.testMinDistanceBetweenAny(x, y, radius, 25)
        );
    }

    spawn(entity) {
        if (this.passesCitySpawnTests(entity.x, entity.y, entity.rad)) {
            this.entitySet.add(entity);
        }
        else {
            entity.x + (Math.random * entity.rad) * (Math.random() < .5 ? 1 : (-1));
            entity.y + (Math.random * entity.rad) * (Math.random() < .5 ? 1 : (-1));
            this.spawnRec(entity, 1)
        }
    }

    spawnRec(entity, n) {
        if (n < 300) {
            let oldX = entity.x;
            let oldY = entity.y;
            entity.x += (Math.random * entity.rad) * (Math.random() < .5 ? 1 : (-1));
            entity.y += (Math.random * entity.rad) * (Math.random() < .5 ? 1 : (-1));
            if (this.passesCitySpawnTests(oldX, oldY, entity.rad)) {
                this.entitySet.add(entity);
            }
            else {
                this.spawnRec(entity, n + 1);
            }
        }
    }
}


class SpawnStrategy {
    constructor(entity) {

    }
}