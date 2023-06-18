import { createMapper } from "@automapper/core";
import { pojos } from "@automapper/pojos";
import { createUserMetadata , createUserMap } from "./userProfile";

createUserMetadata();

const mapper = createMapper({ strategyInitializer: pojos() });

createUserMap(mapper);

export default mapper;