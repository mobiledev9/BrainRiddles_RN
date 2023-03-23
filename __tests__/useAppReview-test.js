import AsyncStorage from '@react-native-async-storage/async-storage';
import {renderHook, act} from '@testing-library/react-hooks';
import SingleCategory from '../screens/SingleCategory';
import InAppReview from 'react-native-in-app-review';

describe('App Review Hook Behavior', () => {
  const currentDate = new Date('2023-02-10T11:01:58.135Z');
  global.Date = class extends Date {
    constructor(date) {
      if (date) {
        return super(date);
      }

      return currentDate;
    }
  };
  afterAll(() => {
    jest.resetModule();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger InAppReview in cross platform in first time', async () => {
    const expectItemSavedToAsync = ['in_App_Review', new Date().toString()];

    const {result} = renderHook(() => SingleCategory());

    await act(() => result.current.onReview());
    expect(AsyncStorage.getItem).toBeCalledWith('in_App_Review');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      ...expectItemSavedToAsync,
    );

    expect(InAppReview.RequestInAppReview).toHaveBeenCalled();
  });

  it('should not trigger InAppReview before 15 days user already get InAppReview', async () => {
    const expectedItem = '2023-02-05';
    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockReturnValueOnce(Promise.resolve(expectedItem));

    const {result} = renderHook(() => SingleCategory());

    await act(() => result.current.onReview());
    expect(AsyncStorage.getItem).toBeCalledWith('in_App_Review');

    expect(InAppReview.RequestInAppReview).not.toHaveBeenCalled();
  });

  it('should trigger InAppReview after 15 days user get InAppReview and save Date to async Storage', async () => {
    const expectedItem = '2023-02-26';
    const expectItemSavedToAsync = ['in_App_Review', new Date().toString()];

    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockReturnValueOnce(Promise.resolve(expectedItem));

    jest.spyOn(AsyncStorage, 'setItem');

    const {result} = renderHook(() => SingleCategory());

    await act(() => result.current.onReview());

    expect(AsyncStorage.getItem).toBeCalledWith('in_App_Review');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      ...expectItemSavedToAsync,
    );
    expect(InAppReview.RequestInAppReview).toHaveBeenCalled();
  });
});
