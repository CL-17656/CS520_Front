import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useRoute, useRouter } from 'vue-router'
import { fetchAssignmentsForGrading, saveGrade } from '@/api/GradingApi'
import GradingPage from '@/views/GradingPageView.vue'

// Mock the API calls
vi.mock('@/api/GradingApi', () => ({
  fetchAssignmentsForGrading: vi.fn(),
  saveGrade: vi.fn()
}));

// Mock vue-router
const mockPush = vi.fn();
vi.mock('vue-router', () => {
  return {
    useRoute: () => ({
      params: {
        quizId: '1',
        studentId: '2'
      }
    }),
    useRouter: () => ({
      push: mockPush
    })
  }
});

describe('GradingPage Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('navigates to instructorhome after saving grade', async () => {
    // Mock assignment data
    const mockData = [
      {
        id: 101,
        questionTitle: "What is 2 + 2?",
        answerDTO: {
          myAnswers: ["4"],
          correctAnswerList: ["4"],
          isCorrect: true
        }
      }
    ];
    fetchAssignmentsForGrading.mockResolvedValueOnce({ data: mockData });
    saveGrade.mockResolvedValueOnce({}); // Simulate successful save

    const wrapper = mount(GradingPage);

    // Wait for the data to load
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    // Provide some feedback (optional, just to simulate user interaction)
    const feedbackTextarea = wrapper.find('textarea.feedback-textarea');
    await feedbackTextarea.setValue('Well done!');

    // Click "Save Grade"
    const saveButton = wrapper.find('button.btn-save-grade');
    await saveButton.trigger('click');

    // After saving, we should navigate to 'instructorhome'
    expect(saveGrade).toHaveBeenCalledOnce();
    expect(mockPush).toHaveBeenCalledWith({ name: 'instructorhome' });
  });
});

