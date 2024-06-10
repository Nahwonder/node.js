import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  createFighter(fighter) {
    fighter.name = fighter.name.toLowerCase();

    if (this.search({ name: fighter.name })) {
      return null;
    }

    return fighterRepository.create(fighter);
  }
  getFighterById(id) {
    const fighter = this.search({ id });

    if (!fighter) {
      return null;
    }

    return fighter;
  }
  getFighters() {
    return fighterRepository.getAll();
  }

  updateFighter(id, data) {
    if (!this.search({ id })) {
      return null;
    }

    if (data.name) {
      data.name = data.name.toLowerCase();
      if (this.search({ name: data.name })) {
        return null;
      }
    }

    return fighterRepository.update(id, data);
  }
  deleteFighter(id) {
    if (!this.search({ id })) {
      return null;
    }

    return fighterRepository.delete(id);
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
