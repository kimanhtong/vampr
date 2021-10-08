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
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let ancestor_arr = [];
    let ancestor = this.creator;
    while (ancestor != null) {
      ancestor_arr.push(ancestor.name);
      ancestor = ancestor.creator;
    }
    return ancestor_arr.length;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    const ancestorList = (junior) => {
      let list = [];
      while (junior.creator !== null) {
        junior = junior.creator;
        list.push(junior);
      }
      return list;
    };
    if (vampire !== this) {
      const this_ancestors = ancestorList(this);
      const vamp_ancestors = ancestorList(vampire);
      if (this_ancestors.indexOf(vampire) >= 0) {
        return vampire;
      }
      if (vamp_ancestors.indexOf(this) >= 0) {
        return this;
      }
      const junior_ancestors = this_ancestors.length >= vamp_ancestors.length ? this_ancestors : vamp_ancestors;
      const senior_ancestors = this_ancestors.length < vamp_ancestors.length ? this_ancestors : vamp_ancestors;
      for (const ancestor of junior_ancestors) {
        if (senior_ancestors.indexOf(ancestor) >= 0) {
          return ancestor;
        }
      }
    } else {
      return this;
    }
  }
}

module.exports = Vampire;

