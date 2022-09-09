class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    const offspring = this.offspring;
    const numOfOffspring = offspring.length - 1;

    offspring.push(vampire);
    offspring[offspring.length - 1].creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVamps = 0;
    let currentVamp = this;

    // climb 'up' the tree (using iteration), counting nodes, until no creator is found
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberOfVamps++;
    }

    return numberOfVamps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return vampire.numberOfVampiresFromOriginal > this.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  climbThroughCreators() {
    // climb 'up' the tree (using iteration), counting nodes, until no creator is found
    let currentVamp = this;
    let ancestors = [this.creator];

    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      ancestors.push(currentVamp);
    }

    return ancestors;
  }
  
  closestCommonAncestor(vampire) {
    const thisAncestors = this.climbThroughCreators();
    const thatAncestors = vampire.climbThroughCreators();

    if (vampire.name === this.name) {
      return this;
    }

    if (this.numberOfVampiresFromOriginal === 0) {
      return this;
    }

    if (vampire.numberOfVampiresFromOriginal === 0) {
      return vampire;
    }

    if (this.creator === vampire || vampire.creator === this) {
      if (this.isMoreSeniorThan(vampire)) {
        return this;
      } else {
        return vampire;
      }
    }

    for (const vamp of thisAncestors) {
      for (const otherVamp of thatAncestors) {
        if (vamp.name === otherVamp.name) {
          return vamp;
        }
      }
    }
  }
}

module.exports = Vampire;