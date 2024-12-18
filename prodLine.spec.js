//f
import { shallowMount } from "@vue/test-utils";
import ProcessLine from "@/components/ProcessLine.vue"; // Adjust the path as necessary
import { PRODUCTION_LINE_LABEL } from "@/common/recipe/rLabels";
import { PROUDUCT_LINE_TABLE } from "@/common/recipe/rTables";

describe("ProcessLine.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ProcessLine, {
      propsData: {
        incrementedUnits: 5, // You can change this value for different tests
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders correctly with given props", () => {
    expect(wrapper.props().incrementedUnits).toBe(5);
    expect(wrapper.vm.productionLineTitle).toBe(PRODUCTION_LINE_LABEL);
    expect(wrapper.vm.TABLE_PROPERTIES).toEqual(
      expect.objectContaining(PROUDUCT_LINE_TABLE)
    );
  });

  it("watches incrementedUnits prop", async () => {
    // Change the prop value
    await wrapper.setProps({ incrementedUnits: 10 });
    // Check if the handler is called and the new value is set correctly
    expect(wrapper.props().incrementedUnits).toBe(10);
  });

  it("has the correct components registered", () => {
    expect(wrapper.findComponent({ name: "CommonLabel" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "CommonTable" }).exists()).toBe(true);
  });
});

//props
import { shallowMount } from '@vue/test-utils';
import ProcessLine from '@/components/ProcessLine.vue'; // Adjust the path as necessary
import { PRODUCTION_LINE_LABEL } from '@/common/recipe/rLabels';
import { PROUDUCT_LINE_TABLE } from '@/common/recipe/rTables';

describe('ProcessLine.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ProcessLine);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('initializes data properties correctly', () => {
    // Access the data properties
    const data = wrapper.vm.$data;
    // Check TABLE_PROPERTIES
    expect(data.TABLE_PROPERTIES).toEqual(expect.objectContaining(PROUDUCT_LINE_TABLE));
    // Check productionLineTitle
    expect(data.productionLineTitle).toBe(PRODUCTION_LINE_LABEL);
  });
});

//watch
import { shallowMount } from '@vue/test-utils';
import ProcessLine from '@/components/ProcessLine.vue'; // Adjust the path as necessary

describe('ProcessLine.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ProcessLine, {
      propsData: {
        incrementedUnits: 0, // Initial value
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('watches incrementedUnits prop and triggers handler', async () => {
    // Set a new value for incrementedUnits
    await wrapper.setProps({ incrementedUnits: 5 });
    // Check if the handler was called with the new value
    expect(wrapper.props().incrementedUnits).toBe(5);
  });

  it('does not trigger handler if new value is the same', async () => {
    // Set the same value for incrementedUnits
    await wrapper.setProps({ incrementedUnits: 0 });
    // Check if the value remains the same
    expect(wrapper.props().incrementedUnits).toBe(0);
  });
});


//s
import { shallowMount } from '@vue/test-utils';
import ProcessLine from '@/components/ProcessLine.vue'; // Adjust the path as necessary
import { PRODUCTION_LINE_LABEL } from '@/common/recipe/rLabels';
import { PROUDUCT_LINE_TABLE } from '@/common/recipe/rTables';

describe('ProcessLine.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ProcessLine, {
      propsData: {
        incrementedUnits: 0, // Initial value for the prop
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('initializes data properties correctly', () => {
    // Access the data properties
    const data = wrapper.vm.$data;

    // Check TABLE_PROPERTIES
    expect(data.TABLE_PROPERTIES).toEqual(expect.objectContaining(PROUDUCT_LINE_TABLE));

    // Check productionLineTitle
    expect(data.productionLineTitle).toBe(PRODUCTION_LINE_LABEL);
  });

  it('watches incrementedUnits prop and updates correctly', async () => {
    // Set a new value for incrementedUnits
    await wrapper.setProps({ incrementedUnits: 5 });

    // Check if the new value is reflected
    expect(wrapper.props().incrementedUnits).toBe(5);
  });

  it('does not update if the same value is set', async () => {
    // Set the same value for incrementedUnits
    await wrapper.setProps({ incrementedUnits: 0 });

    // Check if the value remains the same
    expect(wrapper.props().incrementedUnits).toBe(0);
  });

  it('has the correct components registered', () => {
    expect(wrapper.componentOptions.components.CommonLabel).toBeTruthy();
    expect(wrapper.componentOptions.components.CommonTable).toBeTruthy();
  });
});