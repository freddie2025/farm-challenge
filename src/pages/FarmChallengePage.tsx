import { AnimalsTable, CustomSelect, NameFilter } from "../components";
import { AnimalFilter } from "../interfaces";
import { FarmService } from "../services/FarmService";
import { Fragment, useState } from "react";

const FarmChallengePage = () => {
  const [filters, setFilters] = useState<AnimalFilter>({});

  const handleFilterChange = (key: keyof AnimalFilter, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Fragment>
      <h1>Farm Database</h1>
      <h2>Filters</h2>
      <NameFilter onChange={(name) => handleFilterChange("name", name)} />
      <CustomSelect
        label="Animal Type"
        fetchFunction={FarmService.getAnimalTypes}
        onChange={(type) => handleFilterChange("type", type)}
      />
      <h2>Order</h2>
      <CustomSelect
        label="Order By"
        fetchFunction={FarmService.getAnimalSortOptions}
        onChange={(order) => handleFilterChange("order", order)}
      />
      <hr />
      <h2>Animals</h2>
      <AnimalsTable {...filters} />
    </Fragment>
  );
};

export default FarmChallengePage;
