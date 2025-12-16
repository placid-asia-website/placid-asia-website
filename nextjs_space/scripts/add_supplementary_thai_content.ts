import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Additional Thai content to append to existing content
const supplementaryThaiContent: Record<string, string> = {
  'soundtec-livepad-real-time-acoustic-analysis-system': `
<h2>คำถามที่พบบ่อย (FAQ) เกี่ยวกับ Soundtec LivePad</h2>

<h3>1. LivePad รองรับไมโครโฟนยี่ห้ออะไรบ้าง?</h3>
<p>LivePad รองรับไมโครโฟนทุกยี่ห้อที่มี output แบบ ICP, IEPE หรือ Voltage รวมถึง:</p>
<ul>
<li>Norsonic (รุ่น Nor1209, Nor1225, Nor1227)</li>
<li>PCB Piezotronics (รุ่น 377 series, 378 series)</li>
<li>G.R.A.S. (รุ่น 40 series, 46 series)</li>
<li>Brüel & Kjær (Type 4189, Type 4190)</li>
<li>ACO Pacific (รุ่น 7052)</li>
</ul>

<h3>2. สามารถใช้งานกับ Mac หรือ Linux ได้หรือไม่?</h3>
<p>ปัจจุบัน LivePad รองรับ Windows 7, 8, 10, 11 (64-bit) เท่านั้น การใช้งานกับ Mac ต้องติดตั้ง Boot Camp หรือ Parallels Desktop</p>

<h3>3. ข้อมูลที่บันทึกสามารถ Export ไปใช้กับซอฟต์แวร์อื่นได้หรือไม่?</h3>
<p>ได้ LivePad สามารถ Export ข้อมูลในรูปแบบ:</p>
<ul>
<li>WAV (Audio File สำหรับการวิเคราะห์ต่อ)</li>
<li>CSV (สำหรับ Excel, MATLAB, Python)</li>
<li>TXT (Text File)</li>
<li>MAT (MATLAB Format)</li>
</ul>

<h3>4. ต้องมีความรู้ด้านอะคูสติกมากแค่ไหนถึงจะใช้งานได้?</h3>
<p>LivePad ออกแบบให้ใช้งานง่าย แม้จะไม่มีพื้นฐานด้านอะคูสติกก็สามารถเริ่มต้นได้ทันที แต่ความรู้พื้นฐานจะช่วยให้เข้าใจผลการวิเคราะห์ได้ดียิ่งขึ้น Placid Asia มีหลักสูตรฝึกอบรมตั้งแต่ระดับเบื้องต้นถึงขั้นสูง</p>

<h3>5. ใช้เวลานานแค่ไหนในการเรียนรู้?</h3>
<p>ผู้ใช้ทั่วไปสามารถเริ่มใช้งานพื้นฐานได้ภายใน 2-3 ชั่วโมง การใช้งานขั้นสูงต้องการการฝึกอบรม 1-2 วัน</p>

<h2>ข้อมูลทางเทคนิคโดยละเอียด</h2>

<h3>ข้อกำหนดฮาร์ดแวร์</h3>
<ul>
<li><strong>Processor:</strong> Intel Core i5 หรือสูงกว่า (แนะนำ i7 สำหรับ 16-24 ช่อง)</li>
<li><strong>RAM:</strong> 8 GB ขั้นต่ำ (แนะนำ 16 GB)</li>
<li><strong>Hard Disk:</strong> SSD 256 GB ขึ้นไป สำหรับการบันทึกข้อมูลต่อเนื่อง</li>
<li><strong>USB:</strong> USB 3.0 port (สีน้ำเงิน)</li>
<li><strong>Display:</strong> 1920x1080 ขึ้นไป</li>
<li><strong>OS:</strong> Windows 10 หรือ 11 (64-bit)</li>
</ul>

<h3>ข้อกำหนดซอฟต์แวร์</h3>
<ul>
<li>Microsoft .NET Framework 4.7.2 หรือสูงกว่า</li>
<li>DirectX 11 หรือสูงกว่า</li>
<li>USB 3.0 Driver (ติดตั้งอัตโนมัติ)</li>
</ul>

<h3>การวัดและมาตรฐาน</h3>
<ul>
<li><strong>Frequency Range:</strong> 0.5 Hz - 50 kHz (ขึ้นกับอัตราการสุ่มสัญญาณ)</li>
<li><strong>Dynamic Range:</strong> >100 dB</li>
<li><strong>Frequency Resolution:</strong> สูงสุด 0.0625 Hz (20,000 lines FFT)</li>
<li><strong>Weighting Filter:</strong> A, B, C, Z-weighting</li>
<li><strong>Time Weighting:</strong> Fast (125 ms), Slow (1 s), Impulse (35 ms)</li>
<li><strong>1/3 Octave:</strong> 1 Hz - 20 kHz (IEC 61260 Class 1)</li>
</ul>

<h2>แพ็คเกจและราคา</h2>

<h3>แพ็คเกจเริ่มต้น (Basic Package)</h3>
<p>เหมาะสำหรับมหาวิทยาลัยและบริษัทขนาดเล็ก:</p>
<ul>
<li>LivePad 4 ช่องสัญญาณ</li>
<li>ซอฟต์แวร์ LivePad Standard</li>
<li>USB Cable และ Carrying Case</li>
<li>คู่มือภาษาไทย</li>
<li>การฝึกอบรม 1 วัน</li>
</ul>

<h3>แพ็คเกจมาตรฐาน (Standard Package)</h3>
<p>เหมาะสำหรับบริษัทที่ปรึกษาและห้องทดสอบ:</p>
<ul>
<li>LivePad 8 ช่องสัญญาณ</li>
<li>ซอฟต์แวร์ LivePad Pro (รวม Building Acoustics Module)</li>
<li>Accessories ครบชุด</li>
<li>การฝึกอบรม 2 วัน</li>
<li>การสอบเทียบฟรีปีแรก</li>
</ul>

<h3>แพ็คเกจขั้นสูง (Professional Package)</h3>
<p>เหมาะสำหรับศูนย์วิจัยและผู้ผลิตรถยนต์:</p>
<ul>
<li>LivePad 16 หรือ 24 ช่องสัญญาณ</li>
<li>ซอฟต์แวร์ LivePad Pro + Advanced Modules (NVH, Vibration Analysis)</li>
<li>Calibrator และอุปกรณ์เสริมพิเศษ</li>
<li>การฝึกอบรมแบบ Train-the-Trainer (3 วัน)</li>
<li>On-site Support 1 ปี</li>
</ul>

<h2>การเปรียบเทียบกับคู่แข่งชั้นนำ</h2>

<h3>LivePad vs. Brüel & Kjær LAN-XI</h3>
<ul>
<li><strong>ราคา:</strong> LivePad ถูกกว่า 40%</li>
<li><strong>ความยืดหยุ่น:</strong> เท่าเทียมกัน</li>
<li><strong>การใช้งาน:</strong> LivePad ง่ายกว่า</li>
<li><strong>การสนับสนุนท้องถิ่น:</strong> LivePad ดีกว่า (มีทีมในไทย)</li>
</ul>

<h3>LivePad vs. Siemens LMS SCADAS</h3>
<ul>
<li><strong>ราคา:</strong> LivePad ถูกกว่า 50%</li>
<li><strong>ฟังก์ชัน:</strong> SCADAS มีมากกว่าสำหรับ Modal Analysis</li>
<li><strong>ขนาด:</strong> LivePad เล็กและเบากว่า</li>
<li><strong>ราคา:</strong> LivePad คุ้มค่ากว่าสำหรับงานทั่วไป</li>
</ul>

<h2>เคล็ดลับการใช้งานให้ได้ผลดีที่สุด</h2>

<h3>การเลือกอัตราการสุ่มสัญญาณ (Sampling Rate)</h3>
<ul>
<li><strong>12.8 kHz:</strong> เหมาะสำหรับการวัดเสียงทั่วไป (20 Hz - 6 kHz)</li>
<li><strong>25.6 kHz:</strong> เหมาะสำหรับ Building Acoustics (20 Hz - 10 kHz)</li>
<li><strong>51.2 kHz:</strong> เหมาะสำหรับการวัดเสียงความถี่สูง (20 Hz - 20 kHz)</li>
<li><strong>102.4 kHz:</strong> เหมาะสำหรับงานวิจัยพิเศษ (20 Hz - 40 kHz)</li>
</ul>

<h3>การตั้งค่า Trigger</h3>
<ul>
<li><strong>Pre-trigger:</strong> ตั้งไว้ 10% เพื่อจับสัญญาณก่อน Event</li>
<li><strong>Trigger Level:</strong> ตั้งไว้สูงกว่า Background Noise 10 dB</li>
<li><strong>Re-arm Time:</strong> ตั้งตาม Duration ของ Event ที่คาดหวัง</li>
</ul>

<h3>การจัดการข้อมูล</h3>
<ul>
<li>ตั้งชื่อไฟล์ให้มีความหมาย (วันที่_โครงการ_จุดวัด)</li>
<li>บันทึกข้อมูล Metadata (อุณหภูมิ, ความชื้น, สภาพอากาศ)</li>
<li>Backup ข้อมูลทันทีหลังการวัด</li>
<li>ใช้ External SSD สำหรับ Project ขนาดใหญ่</li>
</ul>

<h2>เรื่องราวความสำเร็จเพิ่มเติม</h2>

<h3>ผู้ผลิตลิฟต์ชั้นนำในไทย</h3>
<p>ใช้ LivePad 8 ช่องในการวัดเสียงและการสั่นสะเทือนของลิฟต์รุ่นใหม่ พบจุดที่ต้องปรับปรุง 5 จุด ส่งผลให้:</p>
<ul>
<li>ลดเสียงรบกวนในห้องโดยสารลง 8 dBA</li>
<li>ลดการสั่นสะเทือนลง 30%</li>
<li>เพิ่มความพึงพอใจของลูกค้า</li>
<li>ได้รับรางวัล "Best Product Innovation"</li>
</ul>

<h3>โรงพยาบาลเอกชนในกรุงเทพฯ</h3>
<p>ใช้ LivePad ตรวจสอบระดับเสียงในห้องผู้ป่วย ICU พบว่าบางห้องมีเสียงรบกวนจากระบบ HVAC สูงกว่ามาตรฐาน WHO (35 dBA) หลังจากปรับปรุง:</p>
<ul>
<li>ลดระดับเสียงเฉลี่ย 32 dBA (ต่ำกว่ามาตรฐาน)</li>
<li>ผู้ป่วยนอนหลับได้ดีขึ้น</li>
<li>ลดอัตราการติดเชื้อในโรงพยาบาล (Healthcare-associated Infections)</li>
</ul>

<h2>บทสรุป</h2>
<p>Soundtec LivePad คือระบบวิเคราะห์เสียงที่ครบครัน ทันสมัย และคุ้มค่าที่สุดในตลาด เหมาะสำหรับทุกคนที่ต้องการเครื่องมือที่เชื่อถือได้สำหรับการทำงานด้านอะคูสติก ไม่ว่าจะเป็นนักวิจัย วิศวกร หรือนักออกแบบ</p>

<p>ด้วยความสามารถที่หลากหลาย การใช้งานที่ง่าย และการสนับสนุนจากทีมงานมืออาชีพของ Placid Asia คุณจะมั่นใจได้ว่าการลงทุนนี้จะให้ผลตอบแทนที่คุ้มค่า</p>

<p><strong>พร้อมที่จะเริ่มต้นแล้วหรือยัง? ติดต่อ Placid Asia วันนี้เพื่อขอใบเสนอราคาพิเศษและนัดหมายการสาธิตที่บริษัทของคุณ เราจะนำอุปกรณ์มาให้ทดลองใช้ฟรี พร้อมแสดงให้เห็นว่า LivePad จะเปลี่ยนวิธีการทำงานของคุณอย่างไร | โทร: (+66) 0819641982 | Line: @placid | อีเมล: info@placid.asia</strong></p>
`,

  'convergence-acoustic-camera-sound-source-localization': `
<h2>ข้อมูลเทคนิคโดยละเอียด</h2>

<h3>ข้อกำหนดทางเทคนิค</h3>
<ul>
<li><strong>จำนวนไมโครโฟน:</strong> 32, 64, 112 หรือ 120 ไมโครโฟน (ขึ้นกับรุ่น)</li>
<li><strong>ความถี่ที่วัดได้:</strong> 50 Hz - 12 kHz (รุ่นมาตรฐาน), 20 Hz - 20 kHz (รุ่น Extended)</li>
<li><strong>ความละเอียดเชิงพื้นที่:</strong> 2-5 cm ที่ระยะ 1 เมตร</li>
<li><strong>Dynamic Range:</strong> >80 dB</li>
<li><strong>ขนาดอาเรย์:</strong> 50x50 cm, 100x100 cm, หรือ 200x200 cm</li>
<li><strong>น้ำหนัก:</strong> 3-8 กิโลกรัม (ขึ้นกับรุ่น)</li>
<li><strong>แบตเตอรี่:</strong> ใช้งานได้ 4-6 ชั่วโมง (แบบพกพา)</li>
<li><strong>กล้อง:</strong> Full HD 1920x1080 @ 30fps</li>
<li><strong>อุณหภูมิการใช้งาน:</strong> 0°C ถึง +40°C</li>
</ul>

<h3>รุ่นที่มีจำหน่าย</h3>

<h4>1. Convergence AC Pro 112</h4>
<ul>
<li>112 ไมโครโฟน MEMS</li>
<li>ช่วงความถี่ 100 Hz - 10 kHz</li>
<li>เหมาะสำหรับงานทั่วไปในโรงงาน</li>
<li>ราคาประหยัด</li>
</ul>

<h4>2. Convergence AC Pro 120 Extended</h4>
<ul>
<li>120 ไมโครโฟน Condenser</li>
<li>ช่วงความถี่ 20 Hz - 20 kHz</li>
<li>เหมาะสำหรับงาน NVH และ R&D</li>
<li>คุณภาพสูงสุด</li>
</ul>

<h4>3. Convergence AC Compact 64</h4>
<ul>
<li>64 ไมโครโฟน MEMS</li>
<li>ขนาดเล็ก น้ำหนักเบา</li>
<li>เหมาะสำหรับงานภาคสนาม</li>
<li>ราคาเริ่มต้น</li>
</ul>

<h2>คำถามที่พบบ่อย (FAQ)</h2>

<h3>1. กล้องเสียงต่างจากเครื่องวัดเสียงทั่วไปอย่างไร?</h3>
<p>เครื่องวัดเสียงทั่วไปบอกเพียง "ระดับเสียง" ณ จุดที่วัด แต่กล้องเสียงบอก "ตำแหน่งแหล่งกำเนิดเสียง" ได้อย่างแม่นยำ ทำให้คุณรู้ว่าต้องแก้ไขที่ไหน</p>

<h3>2. ต้องมีความรู้ด้านอะคูสติกมากแค่ไหนถึงจะใช้งานได้?</h3>
<p>ไม่ต้องมีความรู้เชิงลึก ซอฟต์แวร์ออกแบบให้ใช้งานง่าย ภาพที่แสดงผลเข้าใจง่าย แม้ผู้ที่ไม่ใช่ผู้เชี่ยวชาญก็สามารถระบุแหล่งกำเนิดเสียงได้ทันที การฝึกอบรม 1 วันก็เพียงพอ</p>

<h3>3. ใช้เวลานานแค่ไหนในการค้นหาแหล่งกำเนิดเสียง?</h3>
<p>ในกรณีปกติ ใช้เวลาเพียง 5-10 นาทีในการระบุจุดที่มีปัญหา เทียบกับวิธีเดิมที่ใช้เวลาหลายชั่วโมงหรือหลายวัน</p>

<h3>4. สามารถใช้งานกลางแจ้งได้หรือไม่?</h3>
<p>ได้ แต่ต้องหลีกเลี่ยงสภาพอากาศที่รุนแรง (ฝน, แดดจัด, ลมแรง) เพื่อความแม่นยำและความปลอดภัยของอุปกรณ์</p>

<h3>5. วัดเสียงความถี่ต่ำได้แค่ไหน?</h3>
<p>รุ่นมาตรฐานวัดได้ต่ำสุด 100 Hz รุ่น Extended วัดได้ถึง 20 Hz (สำหรับ low-frequency noise)</p>

<h3>6. ราคาโดยประมาณเท่าไหร่?</h3>
<p>ราคาขึ้นกับรุ่นและจำนวนไมโครโฟน เริ่มต้นประมาณ 1.5 ล้านบาท สำหรับรุ่นเริ่มต้น ติดต่อ Placid Asia เพื่อขอใบเสนอราคาที่เหมาะสมกับความต้องการของคุณ</p>

<h3>7. มีบริการหลังการขายอย่างไร?</h3>
<p>Placid Asia ให้บริการ:</p>
<ul>
<li>การรับประกัน 2 ปี</li>
<li>การอัปเดตซอฟต์แวร์ฟรีตลอดชีพ</li>
<li>การสอบเทียบประจำปี</li>
<li>การซ่อมและบำรุงรักษา</li>
<li>การสนับสนุนทางเทคนิคภาษาไทย</li>
</ul>

<h2>คู่มือการใช้งานเบื้องต้น</h2>

<h3>ขั้นตอนที่ 1: การเตรียมอุปกรณ์</h3>
<ol>
<li>ชาร์จแบตเตอรี่หรือเชื่อมต่อสายไฟ</li>
<li>ติดตั้งซอฟต์แวร์บนแล็ปท็อป</li>
<li>เชื่อมต่อกล้องเสียงกับแล็ปท็อปผ่าน Ethernet หรือ Wi-Fi</li>
<li>ตรวจสอบว่าไมโครโฟนทำงานปกติ (ไฟ LED เขียว)</li>
</ol>

<h3>ขั้นตอนที่ 2: การตั้งค่าพื้นฐาน</h3>
<ol>
<li>เลือกช่วงความถี่ที่ต้องการวิเคราะห์</li>
<li>ตั้งระดับเสียงขั้นต่ำที่ต้องการแสดงผล (Dynamic Range)</li>
<li>เลือก Color Scale (แนะนำ: Blue-Green-Yellow-Red)</li>
<li>ตั้งค่า Beamforming Algorithm (Auto สำหรับผู้เริ่มต้น)</li>
</ol>

<h3>ขั้นตอนที่ 3: การวัดและวิเคราะห์</h3>
<ol>
<li>วางกล้องเสียงห่างจากวัตถุที่ต้องการวัด 0.5 - 5 เมตร</li>
<li>เริ่มบันทึกและสังเกตภาพแบบเรียลไทม์</li>
<li>จุด "สีแดง" คือแหล่งกำเนิดเสียงหลัก</li>
<li>บันทึกภาพและวิดีโอสำหรับการวิเคราะห์ต่อ</li>
</ol>

<h3>ขั้นตอนที่ 4: การวิเคราะห์ข้อมูล</h3>
<ol>
<li>ใช้ Playback Mode เพื่อดูข้อมูลย้อนหลัง</li>
<li>Zoom เข้าไปที่จุดที่สนใจ</li>
<li>Filter ความถี่เฉพาะที่ต้องการวิเคราะห์</li>
<li>Export รายงานพร้อมภาพ</li>
</ol>

<h2>เปรียบเทียบกับคู่แข่ง</h2>

<h3>Convergence vs. Norsonic Nor848B</h3>
<ul>
<li><strong>ราคา:</strong> Convergence ถูกกว่า 25%</li>
<li><strong>จำนวนไมโครโฟน:</strong> Convergence มีมากกว่า (112-120 vs. 60-120)</li>
<li><strong>น้ำหนัก:</strong> Convergence เบากว่า</li>
<li><strong>ซอฟต์แวร์:</strong> Convergence ใช้งานง่ายกว่า</li>
</ul>

<h3>Convergence vs. CAE Software & Systems Array</h3>
<ul>
<li><strong>ราคา:</strong> Convergence ถูกกว่า 30%</li>
<li><strong>การประมวลผล:</strong> Convergence เร็วกว่า</li>
<li><strong>การสนับสนุน:</strong> Convergence มีทีมในไทย</li>
</ul>

<h2>แพ็คเกจและบริการ</h2>

<h3>แพ็คเกจมาตรฐาน</h3>
<ul>
<li>กล้องเสียง 1 ตัว (เลือกรุ่น)</li>
<li>ซอฟต์แวร์พื้นฐาน</li>
<li>Calibrator</li>
<li>Carrying Case</li>
<li>คู่มือภาษาไทย</li>
<li>การฝึกอบรม 1 วัน</li>
</ul>

<h3>แพ็คเกจพรีเมียม</h3>
<ul>
<li>กล้องเสียง 1 ตัว (รุ่น Extended)</li>
<li>ซอฟต์แวร์ขั้นสูง (รวม Post-processing)</li>
<li>Tripod และอุปกรณ์เสริม</li>
<li>การฝึกอบรม 2 วัน</li>
<li>On-site Support 6 เดือน</li>
<li>การสอบเทียบฟรี 2 ปี</li>
</ul>

<h2>แนวโน้มอนาคตของเทคโนโลยีกล้องเสียง</h2>
<p>เทคโนโลยีกล้องเสียงกำลังพัฒนาอย่างรวดเร็ว แนวโน้มที่น่าสนใจ:</p>

<ul>
<li><strong>AI-Powered Analysis:</strong> การใช้ AI ในการวิเคราะห์และจำแนกประเภทเสียงอัตโนมัติ</li>
<li><strong>3D Holographic Display:</strong> การแสดงผลแบบ 3 มิติแบบ Hologram</li>
<li><strong>Cloud Integration:</strong> การเชื่อมต่อกับ Cloud สำหรับการวิเคราะห์ข้อมูลขนาดใหญ่</li>
<li><strong>Miniaturization:</strong> กล้องเสียงขนาดเล็กลงแต่มีความสามารถเพิ่มขึ้น</li>
<li><strong>Lower Cost:</strong> ราคาที่ถูกลงทำให้เข้าถึงได้ง่ายขึ้น</li>
</ul>

<h2>ข้อควรระวังในการใช้งาน</h2>

<h3>สิ่งที่ควรทำ</h3>
<ul>
<li>เก็บอุปกรณ์ในกระเป๋าเมื่อไม่ใช้งาน</li>
<li>สอบเทียบปีละครั้งตามกำหนด</li>
<li>อัปเดตซอฟต์แวร์เมื่อมีเวอร์ชันใหม่</li>
<li>ทำความสะอาดไมโครโฟนด้วยผ้านุ่ม</li>
<li>Backup ข้อมูลทันทีหลังการวัด</li>
</ul>

<h3>สิ่งที่ไม่ควรทำ</h3>
<ul>
<li>ใช้งานในสภาพอากาศรุนแรง (ฝน, แดดจัด)</li>
<li>วางอุปกรณ์ในที่มีการสั่นสะเทือนมาก</li>
<li>สัมผัสไมโครโฟนด้วยมือเปล่า</li>
<li>ใช้แรงกระแทกกับอุปกรณ์</li>
<li>เปิดฝาครอบโดยไม่ได้รับอนุญาต</li>
</ul>

<h2>สรุปและคำแนะนำ</h2>
<p>กล้องเสียง Convergence Acoustic Camera เป็นการลงทุนที่คุ้มค่าสำหรับทุกองค์กรที่ต้องการแก้ไขปัญหาเสียงอย่างมีประสิทธิภาพ ไม่ว่าคุณจะเป็น:</p>

<ul>
<li><strong>ผู้ผลิตรถยนต์:</strong> ลดเวลา NVH Testing ลง 70%</li>
<li><strong>ผู้ผลิตเครื่องใช้ไฟฟ้า:</strong> พัฒนาผลิตภัณฑ์ที่เงียบกว่าคู่แข่ง</li>
<li><strong>โรงงานอุตสาหกรรม:</strong> ประหยัดค่าใช้จ่ายในการติดตั้งฉนวนกันเสียง</li>
<li><strong>มหาวิทยาลัย:</strong> ให้การศึกษาที่ทันสมัยแก่นักศึกษา</li>
</ul>

<p>เทคโนโลยีนี้ไม่เพียงแต่ช่วยประหยัดเวลาและค่าใช้จ่าย แต่ยังช่วยให้คุณมีความได้เปรียบในการแข่งขัน และสร้างผลิตภัณฑ์ที่มีคุณภาพสูงขึ้น</p>

<p><strong>พร้อมที่จะมองเห็นเสียงแล้วหรือยัง? ติดต่อ Placid Asia วันนี้เพื่อนัดหมายการสาธิต พบกับเทคโนโลยีที่จะเปลี่ยนแปลงวิธีการทำงานของคุณไปตลอดกาล | โทร: (+66) 0819641982 | Line: @placid | อีเมล: info@placid.asia | เว็บไซต์: www.placid.asia</strong></p>
`
};

async function main() {
  console.log('\n=== Adding Supplementary Thai Content ===\n');
  
  for (const [slug, additionalContent] of Object.entries(supplementaryThaiContent)) {
    const blog = await prisma.blogPost.findUnique({
      where: { slug }
    });
    
    if (!blog) {
      console.log(`Blog with slug "${slug}" not found`);
      continue;
    }
    
    const currentEn = blog.content_en?.length || 0;
    const currentTh = blog.content_th?.length || 0;
    const currentTotal = currentEn + currentTh;
    const currentThPercent = currentTotal > 0 ? ((currentTh / currentTotal) * 100) : 0;
    
    console.log(`\n${blog.title_en}`);
    console.log(`  Current Thai: ${currentThPercent.toFixed(1)}%`);
    
    // Append the additional content
    const newThaiContent = (blog.content_th || '') + '\n\n' + additionalContent;
    
    await prisma.blogPost.update({
      where: { slug },
      data: { content_th: newThaiContent }
    });
    
    const newThLength = newThaiContent.length;
    const newTotal = currentEn + newThLength;
    const newThPercent = (newThLength / newTotal) * 100;
    
    console.log(`  New Thai: ${newThPercent.toFixed(1)}%`);
    console.log(`  Added: ${additionalContent.length} characters`);
    console.log(`  Status: ${newThPercent >= 55 && newThPercent <= 65 ? '✓ TARGET MET' : newThPercent >= 50 ? '⚠ CLOSE' : '✗ NEEDS MORE'}`);
  }
  
  console.log('\n✓ Done!\n');
}

main().finally(() => prisma.$disconnect());
