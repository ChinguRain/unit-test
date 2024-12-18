import { shallowMount } from '@vue/test-utils';
import ProcessInformationScreen from '@/components/pages/ProcessInformationScreen/ProcessInformationScreen.vue';
import { FetchAPI } from '@/utility/apiRequest';

jest.mock('@/utility/apiRequest'); // Mock the FetchAPI

describe('ProcessInformationScreen.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ProcessInformationScreen);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should initialize data correctly', () => {
    expect(wrapper.vm.reference_CT).toBe(0);
    expect(wrapper.vm.operation_information).toEqual([]);
    expect(wrapper.vm.incremented_units).toBe(0);
    expect(wrapper.vm.incrementInterval).toBeNull();
  });

  it('should call fetchAllOperations and fetchReferenceCT on mounted', async () => {
    const fetchAllOperationsSpy = jest.spyOn(wrapper.vm, 'fetchAllOperations');
    const fetchReferenceCTSpy = jest.spyOn(wrapper.vm, 'fetchReferenceCT');

    await wrapper.vm.$options.mounted[0].call(wrapper.vm); // Call mounted lifecycle hook

    expect(fetchAllOperationsSpy).toHaveBeenCalled();
    expect(fetchReferenceCTSpy).toHaveBeenCalled();
  });

  it('should fetch all operations and initialize incrementer', async () => {
    const mockResponse = { data: [{ planned_number_units: 5, process_id: 1 }] };
    FetchAPI.mockImplementation(() => {
      return {
        get: jest.fn().mockResolvedValueOnce(mockResponse),
      };
    });

    await wrapper.vm.fetchAllOperations();

    expect(wrapper.vm.operation_information).toEqual(mockResponse.data);
    expect(wrapper.vm.incremented_units).toBe(5); // Assuming the last operation has planned_number_units = 5
  });

  it('should fetch reference cycle time and set reference_CT', async () => {
    const mockResponse = { success: true, data: [{ reference_cycle_time: 2 }] };
    FetchAPI.mockImplementation(() => {
      return {
        get: jest.fn().mockResolvedValueOnce(mockResponse),
      };
    });

    await wrapper.vm.fetchReferenceCT();

    expect(wrapper.vm.reference_CT).toBe(2000); // 2 seconds in milliseconds
  });

  it('should handle errors in fetchAllOperations gracefully', async () => {
    FetchAPI.mockImplementation(() => {
      return {
        get: jest.fn().mockRejectedValue(new Error('API Error')),
      };
    });

    await wrapper.vm.fetchAllOperations();

    expect(wrapper.vm.operation_information).toEqual([]); // Should remain empty on error
  });

  it('should handle errors in fetchReferenceCT gracefully', async () => {
    FetchAPI.mockImplementation(() => {
      return {
        get: jest.fn().mockRejectedValue(new Error('API Error')),
      };
    });

    await wrapper.vm.fetchReferenceCT();

    expect(wrapper.vm.reference_CT).toBe(0); // Should remain 0 on error
  });
});

//s
import { shallowMount } from '@vue/test-utils';
import ProcessInformationScreen from '@/components/pages/ProcessInformationScreen/ProcessInformationScreen.vue';
import { FetchAPI } from '@/utility/apiRequest';

jest.mock('@/utility/apiRequest'); // Mock the FetchAPI

describe('ProcessInformationScreen.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ProcessInformationScreen);
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should initialize data correctly', () => {
    expect(wrapper.vm.reference_CT).toBe(0);
    expect(wrapper.vm.operation_information).toEqual([]);
    expect(wrapper.vm.incremented_units).toBe(0);
    expect(wrapper.vm.incrementInterval).toBeNull();
  });

  it('should call fetchAllOperations and fetchReferenceCT on mounted', async () => {
    const fetchAllOperationsSpy = jest.spyOn(wrapper.vm, 'fetchAllOperations');
    const fetchReferenceCTSpy = jest.spyOn(wrapper.vm, 'fetchReferenceCT');

    await wrapper.vm.$options.mounted[0].call(wrapper.vm); // Call mounted lifecycle hook

    expect(fetchAllOperationsSpy).toHaveBeenCalled();
    expect(fetchReferenceCTSpy).toHaveBeenCalled();
  });

  it('should fetch all operations and initialize incrementer', async () => {
    const mockResponse = { data: [{ planned_number_units: 5, process_id: 1 }] };
    FetchAPI.mockImplementation(() => ({
      get: jest.fn().mockResolvedValueOnce(mockResponse),
    }));

    await wrapper.vm.fetchAllOperations();

    expect(wrapper.vm.operation_information).toEqual(mockResponse.data);
    expect(wrapper.vm.incremented_units).toBe(5); // Assuming the last operation has planned_number_units = 5
  });

  it('should fetch reference cycle time and set reference_CT', async () => {
    const mockResponse = { success: true, data: [{ reference_cycle_time: 2 }] };
    FetchAPI.mockImplementation(() => ({
      get: jest.fn().mockResolvedValueOnce(mockResponse),
    }));

    await wrapper.vm.fetchReferenceCT();

    expect(wrapper.vm.reference_CT).toBe(2000); // 2 seconds in milliseconds
  });

  it('should handle errors in fetchAllOperations gracefully', async () => {
    FetchAPI.mockImplementation(() => ({
      get: jest.fn().mockRejectedValue(new Error('API Error')),
    }));

    await wrapper.vm.fetchAllOperations();

    expect(wrapper.vm.operation_information).toEqual([]); // Should remain empty on error
  });

  it('should handle errors in fetchReferenceCT gracefully', async () => {
    FetchAPI.mockImplementation(() => ({
      get: jest.fn().mockRejectedValue(new Error('API Error')),
    }));

    await wrapper.vm.fetchReferenceCT();

    expect(wrapper.vm.reference_CT).toBe(0); // Should remain 0 on error
  });

  // Additional tests for incrementer functionality can be added here
});



//t
import { shallowMount } from '@vue/test-utils';
import ProcessInformationScreen from '@/components/pages/ProcessInformationScreen/ProcessInformationScreen.vue'; // Corrected component import

jest.mock('@/utility/apiRequest', () => ({
  FetchAPI: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    put: jest.fn(),
  })),
}));

describe('ProcessInformationScreen.vue', () => {
  let wrapper;
  let mockFetchAPI;

  beforeEach(() => {
    wrapper = shallowMount(ProcessInformationScreen);
    mockFetchAPI = wrapper.vm.$options.methods.fetchAllOperations.bind(wrapper.vm);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches all operations on mount', async () => {
    const mockResponse = { data: [{ process_id: 1, planned_number_units: 0 }] };
    wrapper.vm.$options.methods.fetchAllOperations.mockResolvedValueOnce(mockResponse);

    await wrapper.vm.$nextTick();

    expect(mockFetchAPI).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.operation_information).toEqual(mockResponse.data);
    expect(wrapper.vm.incremented_units).toBe(0);
  });

  it('handles errors during fetchAllOperations', async () => {
    const error = new Error('API error');
    wrapper.vm.$options.methods.fetchAllOperations.mockRejectedValueOnce(error);

    await wrapper.vm.$nextTick();

    expect(mockFetchAPI).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(error);
  });

  it('fetches reference cycle time on mount', async () => {
    const mockResponse = { data: [{ reference_cycle_time: 2 }] };
    wrapper.vm.$options.methods.fetchReferenceCT.mockResolvedValueOnce(mockResponse);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$options.methods.fetchReferenceCT).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.reference_CT).toBe(2000); // 2 seconds in milliseconds
  });

  it('handles errors during fetchReferenceCT', async () => {
    const error = new Error('API error');
    wrapper.vm.$options.methods.fetchReferenceCT.mockRejectedValueOnce(error);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$options.methods.fetchReferenceCT).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(error);
  });

  it('updates planned units correctly', async () => {
    wrapper.vm.operation_information = [{ process_id: 1 }];
    wrapper.vm.incremented_units = 10;

    await wrapper.vm.updatePlannedUnits();

    expect(wrapper.vm.$options.methods.updatePlannedUnits).toHaveBeenCalledTimes(1);
    expect(FetchAPI().put).toHaveBeenCalledWith('/api/update-units/1', { planned_number_units: 10 });
  });

  it('handles errors during updatePlannedUnits', async () => {
    wrapper.vm.operation_information = [{ process_id: 1 }];
    wrapper.vm.incremented_units = 10;
    FetchAPI().put.mockRejectedValueOnce(new Error('Update error'));

    await wrapper.vm.updatePlannedUnits();

    expect(console.error).toHaveBeenCalledWith('Failed to update planned number units:', new Error('Update error'));
  });

  it('starts incrementer correctly', () => {
    wrapper.vm.operation_information = [{ process_id: 1, planned_number_units: 0 }];
    wrapper.vm.startIncrementer();

    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  it('clears incrementer correctly', () => {
    wrapper.vm.incrementInterval = setInterval(() => {}, 1000);
    wrapper.vm.clearIncrementer();

    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it('restarts incrementer correctly', () => {
    wrapper.vm.clearIncrementer = jest.fn();
    wrapper.vm.startIncrementer = jest.fn();

    wrapper.vm.restartIncrementer();

    expect(wrapper.vm.clearIncrementer).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.startIncrementer).toHaveBeenCalledTimes(1);
  });
});


//f

import { shallowMount } from '@vue/test-utils';
import ProcessInformationScreen from '@/components/pages/ProcessInformationScreen/ProcessInformationScreen.vue';
import { FetchAPI } from '@/utility/apiRequest';

// Mock the FetchAPI module
jest.mock('@/utility/apiRequest', () => ({
  FetchAPI: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    put: jest.fn(),
  })),
}));

// Mock setInterval and clearInterval
global.setInterval = jest.fn();
global.clearInterval = jest.fn();

describe('ProcessInformationScreen.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ProcessInformationScreen, {
      mocks: {
        $t: (msg) => msg, // Mock translation if needed
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call fetchAllOperations and fetchReferenceCT on mounted', async () => {
    // Arrange
    const mockFetchOperations = { data: [{ process_id: 1, planned_number_units: 5 }] };
    const mockFetchCT = { success: true, data: [{ reference_cycle_time: 2 }] };

    FetchAPI.mockImplementationOnce(() => ({
      get: jest.fn().mockResolvedValueOnce(mockFetchOperations).mockResolvedValueOnce(mockFetchCT),
    }));

    // Act
    await wrapper.vm.$nextTick(); // Wait for the mounted lifecycle hook

    // Assert
    expect(FetchAPI).toHaveBeenCalledTimes(2); // fetchAllOperations and fetchReferenceCT
    expect(wrapper.vm.operation_information).toEqual(mockFetchOperations.data);
    expect(wrapper.vm.reference_CT).toBe(2000); // (2 * 1000) = 2000
  });

  it('should call startIncrementer if operations are fetched successfully', async () => {
    // Arrange
    const mockFetchOperations = { data: [{ process_id: 1, planned_number_units: 5 }] };
    const mockFetchCT = { success: true, data: [{ reference_cycle_time: 2 }] };

    FetchAPI.mockImplementationOnce(() => ({
      get: jest.fn().mockResolvedValueOnce(mockFetchOperations).mockResolvedValueOnce(mockFetchCT),
    }));

    // Act
    await wrapper.vm.fetchAllOperations();
    await wrapper.vm.fetchReferenceCT();

    // Assert
    expect(global.setInterval).toHaveBeenCalled();
    expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 2000); // should be called with the correct interval time
  });

  it('should handle error in fetchAllOperations gracefully', async () => {
    // Arrange
    const error = new Error('API error');
    FetchAPI.mockImplementationOnce(() => ({
      get: jest.fn().mockRejectedValueOnce(error),
    }));

    // Act
    await wrapper.vm.fetchAllOperations();

    // Assert
    expect(wrapper.vm.operation_information).toEqual([]);
    expect(console.log).toHaveBeenCalledWith(error); // Ensure error is logged
  });

  it('should call updatePlannedUnits when incrementing units', async () => {
    // Arrange
    const mockFetchOperations = { data: [{ process_id: 1, planned_number_units: 5 }] };
    const mockFetchCT = { success: true, data: [{ reference_cycle_time: 2 }] };
    const mockPutResponse = { data: {} };

    FetchAPI.mockImplementationOnce(() => ({
      get: jest.fn().mockResolvedValueOnce(mockFetchOperations).mockResolvedValueOnce(mockFetchCT),
      put: jest.fn().mockResolvedValueOnce(mockPutResponse),
    }));

    wrapper.vm.incremented_units = 0; // Start with 0 incremented units

    // Act
    await wrapper.vm.fetchAllOperations();
    await wrapper.vm.fetchReferenceCT();
    jest.runOnlyPendingTimers(); // Simulate setInterval firing

    // Assert
    expect(FetchAPI.prototype.put).toHaveBeenCalledWith(
      '/api/update-units/1', // Assuming process_id = 1
      { planned_number_units: 1 }
    );
  });

  it('should clear the increment interval when component is destroyed', async () => {
    // Arrange
    const mockFetchOperations = { data: [{ process_id: 1, planned_number_units: 5 }] };
    const mockFetchCT = { success: true, data: [{ reference_cycle_time: 2 }] };

    FetchAPI.mockImplementationOnce(() => ({
      get: jest.fn().mockResolvedValueOnce(mockFetchOperations).mockResolvedValueOnce(mockFetchCT),
    }));

    // Act
    await wrapper.vm.fetchAllOperations();
    await wrapper.vm.fetchReferenceCT();
    wrapper.vm.$destroy(); // Manually destroy the component

    // Assert
    expect(global.clearInterval).toHaveBeenCalled();
  });
});
