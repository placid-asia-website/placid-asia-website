
// Sound Intensity Guide Content
export const soundIntensityGuide = {
  slug: 'sound-intensity-measurement',
  title: 'Sound Intensity Measurement - Complete Guide',
  title_th: 'คู่มือการวัดความเข้มเสียง',
  description: 'Comprehensive guide to sound intensity measurement techniques, equipment selection, and applications for noise source identification and sound power determination.',
  description_th: 'คู่มือฉบับสมบูรณ์สำหรับเทคนิคการวัดความเข้มเสียง การเลือกอุปกรณ์ และการใช้งานสำหรับการระบุแหล่งกำเนิดเสียงรบกวนและการกำหนดกำลังเสียง',
  readTime: '15 min read',
  level: 'Advanced',
  category: 'Advanced Measurement',
  
  introduction: {
    text: 'Sound intensity measurement is a powerful technique that allows engineers and acousticians to measure both the magnitude and direction of sound energy flow. Unlike traditional sound pressure measurements, intensity probes can determine sound power in situ, identify noise sources in complex environments, and work effectively even in the presence of high background noise.',
    text_th: 'การวัดความเข้มเสียงเป็นเทคนิคที่ทรงพลังที่ช่วยให้วิศวกรและนักอะคูสติกวัดทั้งขนาดและทิศทางของการไหลของพลังงานเสียง ต่างจากการวัดความดันเสียงแบบดั้งเดิม เครื่องวัดความเข้มสามารถกำหนดกำลังเสียงในสถานที่ ระบุแหล่งกำเนิดเสียงรบกวนในสภาพแวดล้อมที่ซับซ้อน และทำงานได้อย่างมีประสิทธิภาพแม้ในที่ที่มีเสียงพื้นหลังสูง',
  },

  keyApplications: [
    {
      title: 'Sound Power Determination',
      description: 'Measure sound power of machinery and equipment in situ without requiring special test facilities',
      standard: 'ISO 9614-1, ISO 9614-2, ISO 9614-3',
    },
    {
      title: 'Noise Source Identification',
      description: 'Pinpoint specific noise sources on complex machinery by mapping sound intensity distribution',
      standard: 'ISO 9614-2',
    },
    {
      title: 'Noise Path Analysis',
      description: 'Identify dominant transmission paths in vehicles, buildings, and industrial equipment',
      standard: 'ISO 9614',
    },
    {
      title: 'Transmission Loss Measurement',
      description: 'Evaluate sound insulation performance of panels, partitions, and enclosures',
      standard: 'ASTM E2249',
    },
  ],

  equipmentRequired: [
    {
      item: 'Sound Intensity Probe',
      details: 'Two-microphone probe with precise phase matching and calibrated spacer (typically 6mm, 12mm, 50mm spacers)',
      priority: 'Essential',
    },
    {
      item: 'Sound Intensity Analyzer',
      details: 'Real-time dual-channel FFT analyzer with intensity processing algorithms',
      priority: 'Essential',
    },
    {
      item: 'Intensity Calibrator',
      details: 'Specialized calibrator for verifying probe phase match and pressure-intensity index',
      priority: 'Essential',
    },
    {
      item: 'Measurement Software',
      details: 'Software for intensity mapping, sound power calculation, and data visualization',
      priority: 'Highly Recommended',
    },
    {
      item: 'Positioning System',
      details: 'Mechanical scanning frame or robotic arm for automated measurements (optional but valuable)',
      priority: 'Optional',
    },
  ],

  technicalConsiderations: [
    {
      criterion: 'Frequency Range',
      consideration: 'Spacer selection crucial: 6mm for high freq (up to 6.3kHz), 12mm for mid freq (up to 3.15kHz), 50mm for low freq (down to 50Hz)',
    },
    {
      criterion: 'Phase Match',
      consideration: 'Microphone phase match must be within 0.2° - regular calibration essential for accuracy',
    },
    {
      criterion: 'Pressure-Intensity Index',
      consideration: 'Indicates measurement quality - should be < 7 dB for valid results, challenging in reverberant fields',
    },
    {
      criterion: 'Scanning Technique',
      consideration: 'Manual scanning requires skilled operator - automated systems ensure repeatability and reduce fatigue',
    },
    {
      criterion: 'Background Noise',
      consideration: 'Intensity method works well with high background noise - major advantage over sound pressure methods',
    },
  ],

  measurementStandards: [
    {
      standard: 'ISO 9614-1',
      description: 'Sound power determination using sound intensity - Discrete-point method',
      application: 'Stationary sources with defined measurement surface',
    },
    {
      standard: 'ISO 9614-2',
      description: 'Sound power determination - Scanning method',
      application: 'Complex sources requiring rapid assessment',
    },
    {
      standard: 'ISO 9614-3',
      description: 'Sound power determination - Precision method for discrete points',
      application: 'High accuracy measurements in controlled conditions',
    },
    {
      standard: 'ASTM E2249',
      description: 'Field measurement of transmission loss using sound intensity',
      application: 'Building acoustics, partition testing',
    },
  ],

  advantages: [
    'Measures sound power in situ without special facilities',
    'Identifies direction of energy flow - pinpoints sources',
    'Works effectively in high background noise environments',
    'No environmental corrections needed (unlike pressure methods)',
    'Can isolate contributions from individual sources',
    'Suitable for complex irregular-shaped sources',
  ],

  limitations: [
    'More expensive than sound pressure equipment',
    'Requires careful calibration and phase matching',
    'Not effective for very low-intensity sources',
    'Challenging in highly reverberant environments',
    'Manual scanning requires operator skill and experience',
    'Measurement uncertainty higher than laboratory methods',
  ],

  budgetGuidance: [
    {
      tier: 'Entry System ($15,000 - $25,000)',
      includes: [
        'Basic intensity probe with one spacer',
        'Two-channel FFT analyzer',
        'Intensity calibrator',
        'Basic software',
      ],
      suitable: 'Occasional sound power measurements, educational purposes',
    },
    {
      tier: 'Professional System ($30,000 - $50,000)',
      includes: [
        'Precision intensity probe with multiple spacers',
        'Advanced real-time analyzer',
        'Professional calibrator',
        'Comprehensive software with mapping',
        'Accessories and carrying case',
      ],
      suitable: 'Regular consultancy work, R&D testing, product development',
    },
    {
      tier: 'Advanced System ($60,000+)',
      includes: [
        'Multi-probe capability',
        'Automated scanning system',
        'Integration with acoustic cameras',
        'Advanced visualization software',
        'Complete accessory set',
      ],
      suitable: 'Research institutions, automotive NVH, aerospace applications',
    },
  ],

  selectionTips: [
    'Ensure analyzer has true intensity processing (not just simultaneous pressure measurement)',
    'Check microphone phase matching specifications - critical for accuracy',
    'Consider frequency range requirements before selecting spacer set',
    'Evaluate software capabilities for mapping and visualization',
    'Budget for regular calibration services and microphone maintenance',
    'Consider training requirements - intensity measurement requires skill',
  ],

  commonErrors: [
    'Using incorrect spacer for measurement frequency range',
    'Failing to verify phase match before measurements',
    'Ignoring pressure-intensity index warnings',
    'Improper scanning speed and technique',
    'Inadequate measurement surface definition',
    'Not accounting for reactive intensity near sources',
  ],

  keywords: ['sound intensity', 'intensity probe', 'sound power', 'noise source identification', 'ISO 9614', 'intensity measurement', 'acoustic intensity', 'two-microphone probe'],
};
