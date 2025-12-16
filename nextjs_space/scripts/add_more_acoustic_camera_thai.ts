import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const additionalContent = `
<h2>การประยุกต์ใช้กล้องเสียงในอุตสาหกรรมต่างๆ โดยละเอียด</h2>

<h3>อุตสาหกรรมยานยนต์: การใช้งานที่หลากหลาย</h3>

<h4>การทดสอบเสียงเครื่องยนต์ (Engine Noise Testing)</h4>
<p>กล้องเสียงช่วยระบุแหล่งกำเนิดเสียงจากเครื่องยนต์อย่างละเอียด:</p>
<ul>
<li><strong>Combustion Noise:</strong> เสียงจากการระเบิดในห้องเผาไหม้</li>
<li><strong>Mechanical Noise:</strong> เสียงจากชิ้นส่วนเครื่องยนต์ที่เคลื่อนไหว (ลูกสูบ, เพลาข้อเหวี่ยง, วาล์ว)</li>
<li><strong>Air Intake Noise:</strong> เสียงจากระบบไอดีอากาศ</li>
<li><strong>Exhaust Noise:</strong> เสียงจากระบบไอเสีย</li>
</ul>

<p>การระบุแหล่งเสียงที่แม่นยำช่วยให้วิศวกรสามารถออกแบบฉนวนกันเสียงที่มีประสิทธิภาพสูงและลดน้ำหนักของระบบลดเสียง</p>

<h4>การทดสอบเสียงลม (Wind Noise Testing)</h4>
<p>ในอุโมงค์ลม (Wind Tunnel) กล้องเสียงช่วยระบุ:</p>
<ul>
<li>จุดรั่วของอากาศรอบกระจกและประตู</li>
<li>เสียงจากกระจกมองข้างและแอ่งล้อ</li>
<li>เสียงจากรอยต่อของชิ้นส่วนต่างๆ</li>
</ul>

<p>ข้อมูลนี้ช่วยปรับปรุงการออกแบบเพื่อลดค่าสัมประสิทธิ์แรงต้าน (Drag Coefficient) และเสียงรบกวนในห้องโดยสาร</p>

<h4>การทดสอบเสียงสัมผัสถนน (Road Noise Testing)</h4>
<p>บนถนนทดสอบ (Test Track) หรือโดยใช้ Rolling Road Dynamometer:</p>
<ul>
<li>วัดเสียงจากยางรถยนต์</li>
<li>วัดเสียงจากระบบกันสะเทือน</li>
<li>วัดเสียงที่เกิดจากความผิดปกติของระบบขับเคลื่อน</li>
</ul>

<h3>อุตสาหกรรมการบิน: การรักษามาตรฐานความปลอดภัยและสิ่งแวดล้อม</h3>

<h4>การตรวจสอบเครื่องบิน</h4>
<p>กล้องเสียงถูกใช้ในการตรวจสอบ:</p>
<ul>
<li><strong>เครื่องยนต์เจ็ท:</strong> ระบุความผิดปกติของใบพัด (Fan Blades) และระบบเผาไหม้</li>
<li><strong>ระบบไฮดรอลิก:</strong> ตรวจจับรอยรั่วและปั๊มที่มีปัญหา</li>
<li><strong>Flaps และ Landing Gear:</strong> วิเคราะห์เสียงผิดปกติที่อาจบ่งบอกถึงความเสียหาย</li>
<li><strong>APU (Auxiliary Power Unit):</strong> ตรวจสอบสภาพการทำงาน</li>
</ul>

<h4>การออกแบบเพื่อลดเสียงรบกวนชุมชน</h4>
<ul>
<li>วิเคราะห์เสียงจากเครื่องบินในระยะขึ้น-ลง</li>
<li>ออกแบบ Noise Barrier ในสนามบิน</li>
<li>ปรับแต่งเส้นทางการบินเพื่อลดผลกระทบต่อชุมชน</li>
</ul>

<h3>อุตสาหกรรมพลังงาน: การตรวจสอบและบำรุงรักษา</h3>

<h4>โรงไฟฟ้า</h4>
<p>การใช้กล้องเสียงในโรงไฟฟ้า:</p>
<ul>
<li><strong>กังหันไอน้ำ (Steam Turbine):</strong> ตรวจจับความผิดปกติของใบพัดและแบริ่ง</li>
<li><strong>เครื่องกำเนิดไฟฟ้า (Generator):</strong> วิเคราะห์เสียงจากรอเตอร์และสเตเตอร์</li>
<li><strong>หม้อน้ำ (Boiler):</strong> ระบุรอยรั่วและจุดที่มีการสั่นสะเทือนผิดปกติ</li>
<li><strong>ปั๊มและพัดลม:</strong> Predictive Maintenance ก่อนเกิดความเสียหาย</li>
</ul>

<h4>กังหันลม (Wind Turbine)</h4>
<p>กล้องเสียงช่วยในการ:</p>
<ul>
<li>ตรวจสอบเสียงผิดปกติของใบพัดและ Gearbox</li>
<li>วัดระดับเสียงเพื่อปฏิบัติตามกฎหมายสิ่งแวดล้อม</li>
<li>ระบุจุดที่ต้องปรับปรุงการออกแบบ</li>
</ul>

<h3>อุตสาหกรรมอิเล็กทรอนิกส์: การควบคุมคุณภาพผลิตภัณฑ์</h3>

<h4>คอมพิวเตอร์และโน้ตบุ๊ก</h4>
<p>ผู้ผลิตใช้กล้องเสียงเพื่อ:</p>
<ul>
<li>ลดเสียงจากพัดลมระบายความร้อน</li>
<li>ระบุเสียง Coil Whine จากแหล่งจ่ายไฟ</li>
<li>ตรวจสอบเสียงจาก Hard Disk และ Optical Drive</li>
<li>ปรับปรุงการออกแบบเพื่อให้ผลิตภัณฑ์เงียบกว่าคู่แข่ง</li>
</ul>

<h4>เครื่องใช้ไฟฟ้าในบ้าน</h4>
<ul>
<li><strong>ตู้เย็น:</strong> ลดเสียงจากคอมเพรสเซอร์และพัดลม</li>
<li><strong>เครื่องซักผ้า:</strong> ระบุเสียงผิดปกติจากมอเตอร์และระบบระบายน้ำ</li>
<li><strong>เครื่องปรับอากาศ:</strong> ปรับปรุงการไหลของอากาศเพื่อลดเสียงรบกวน</li>
<li><strong>เครื่องดูดฝุ่น:</strong> ลดเสียงจากมอเตอร์และการไหลของอากาศ</li>
</ul>

<h2>เทคนิคการวัดขั้นสูง</h2>

<h3>การวัดในสภาพแวดล้อมที่มีเสียงรบกวนสูง</h3>
<p>เมื่อทำงานในโรงงานหรือบริเวณที่มีเสียงดังมาก:</p>
<ul>
<li><strong>Background Noise Subtraction:</strong> ลบเสียงรบกวนพื้นหลังออก</li>
<li><strong>Frequency Filtering:</strong> Filter เฉพาะช่วงความถี่ที่สนใจ</li>
<li><strong>Time Gating:</strong> วัดเฉพาะช่วงเวลาที่เสียงเป้าหมายมีความเข้มสูงสุด</li>
<li><strong>Multiple Array Positions:</strong> วัดจากหลายมุมเพื่อความแม่นยำ</li>
</ul>

<h3>การวัดความถี่ต่ำ (Low Frequency Measurement)</h3>
<p>เสียงความถี่ต่ำ (<200 Hz) มีความท้าทายพิเศษ:</p>
<ul>
<li>ใช้อาเรย์ขนาดใหญ่ (2x2 เมตร หรือมากกว่า)</li>
<li>เพิ่มระยะห่างระหว่างกล้องกับวัตถุ</li>
<li>ใช้เวลาบันทึกนานขึ้น (30-60 วินาที)</li>
<li>ใช้ Advanced Beamforming Algorithms</li>
</ul>

<h3>การวัดในโหมด Pass-by</h3>
<p>สำหรับการวัดเสียงจากยานพาหนะที่เคลื่อนที่ผ่าน:</p>
<ul>
<li>ตั้งกล้องเสียงข้างทาง</li>
<li>บันทึกวิดีโอความเร็วสูง (60fps หรือมากกว่า)</li>
<li>ใช้ Time Synchronization เพื่อเชื่อมโยงข้อมูล</li>
<li>วิเคราะห์หลายช่วงความเร็ว</li>
</ul>

<h2>ROI (Return on Investment) จากการใช้กล้องเสียง</h2>

<h3>การประหยัดโดยตรง</h3>

<h4>ลดเวลาในการแก้ไขปัญหา</h4>
<ul>
<li><strong>ก่อนใช้กล้องเสียง:</strong> ใช้เวลา 2-5 วันในการระบุแหล่งกำเนิดเสียง</li>
<li><strong>หลังใช้กล้องเสียง:</strong> ใช้เวลาเพียง 1-2 ชั่วโมง</li>
<li><strong>การประหยัด:</strong> 90% ของเวลา</li>
</ul>

<h4>ลดการใช้วัสดุฉนวนกันเสียงที่ไม่จำเป็น</h4>
<ul>
<li><strong>ก่อน:</strong> ติดตั้งฉนวนทั่วทั้งพื้นที่ (Over-engineering)</li>
<li><strong>หลัง:</strong> ติดตั้งเฉพาะจุดที่มีปัญหา</li>
<li><strong>การประหยัด:</strong> 40-60% ของค่าวัสดุ</li>
</ul>

<h3>การประหยัดโดยอ้อม</h3>

<h4>ปรับปรุงคุณภาพผลิตภัณฑ์</h4>
<ul>
<li>ลดข้อร้องเรียนจากลูกค้า</li>
<li>เพิ่มความพึงพอใจและความภักดีของลูกค้า</li>
<li>สร้างภาพลักษณ์แบรนด์ที่ดีขึ้น</li>
</ul>

<h4>เพิ่มความสามารถในการแข่งขัน</h4>
<ul>
<li>พัฒนาผลิตภัณฑ์ที่เงียบกว่าคู่แข่ง</li>
<li>ลดเวลาในการนำผลิตภัณฑ์สู่ตลาด (Time-to-Market)</li>
<li>สร้างข้อได้เปรียบทางการตลาด</li>
</ul>

<h3>ตัวอย่างการคำนวณ ROI</h3>

<h4>กรณีศึกษา: โรงงานผลิตชิ้นส่วนรถยนต์</h4>
<p><strong>ค่าใช้จ่าย:</strong></p>
<ul>
<li>ราคากล้องเสียง: 2,000,000 บาท</li>
<li>การฝึกอบรมและติดตั้ง: 100,000 บาท</li>
<li>รวม: 2,100,000 บาท</li>
</ul>

<p><strong>ผลประหยัดต่อปี:</strong></p>
<ul>
<li>ประหยัดเวลาวิศวกร: 500 ชั่วโมง x 500 บาท/ชั่วโมง = 250,000 บาท</li>
<li>ลดค่าวัสดุฉนวนกันเสียง: 40% x 1,000,000 บาท = 400,000 บาท</li>
<li>ลดข้อร้องเรียนและค่าซ่อม: 300,000 บาท</li>
<li>เพิ่มประสิทธิภาพการผลิต: 200,000 บาท</li>
<li><strong>รวมต่อปี: 1,150,000 บาท</strong></li>
</ul>

<p><strong>Payback Period: 2,100,000 / 1,150,000 = 1.8 ปี</strong></p>

<h2>แนวทางการเลือกซื้อกล้องเสียงที่เหมาะสม</h2>

<h3>ปัจจัยที่ต้องพิจารณา</h3>

<h4>1. งบประมาณ</h4>
<ul>
<li><strong>งบประมาณต่ำ (< 1.5 ล้าน):</strong> เลือกรุ่นเริ่มต้น 32-64 ไมโครโฟน</li>
<li><strong>งบประมาณปานกลาง (1.5-2.5 ล้าน):</strong> เลือกรุ่น 112 ไมโครโฟน</li>
<li><strong>งบประมาณสูง (> 2.5 ล้าน):</strong> เลือกรุ่น 120 ไมโครโฟน Extended</li>
</ul>

<h4>2. ประเภทงาน</h4>
<ul>
<li><strong>งานทั่วไป:</strong> ความถี่ 100 Hz - 10 kHz</li>
<li><strong>งาน NVH:</strong> ความถี่ 20 Hz - 20 kHz</li>
<li><strong>งานภาคสนาม:</strong> รุ่นพกพาและทนทาน</li>
<li><strong>งานวิจัย:</strong> รุ่นที่มี Advanced Features</li>
</ul>

<h4>3. สภาพแวดล้อมการใช้งาน</h4>
<ul>
<li><strong>ในห้องทดลอบ:</strong> รุ่นมาตรฐาน</li>
<li><strong>ในโรงงาน:</strong> รุ่นที่ทนทานต่อฝุ่นและความสั่นสะเทือน</li>
<li><strong>กลางแจ้ง:</strong> รุ่นที่มี Weather Protection</li>
</ul>

<h4>4. ความต้องการในอนาคต</h4>
<ul>
<li>พิจารณาว่าต้องการขยายความสามารถในอนาคตหรือไม่</li>
<li>เลือกรุ่นที่สามารถอัปเกรดซอฟต์แวร์ได้</li>
<li>ตรวจสอบว่ามีอุปกรณ์เสริมที่ต้องการหรือไม่</li>
</ul>

<h2>การบำรุงรักษาและการสอบเทียบ</h2>

<h3>การบำรุงรักษาประจำ</h3>

<h4>รายสัปดาห์</h4>
<ul>
<li>ทำความสะอาดไมโครโฟนด้วยผ้านุ่ม</li>
<li>ตรวจสอบสภาพของสายเคเบิล</li>
<li>เช็ดกระจกเลนส์กล้อง</li>
</ul>

<h4>รายเดือน</h4>
<ul>
<li>ตรวจสอบสภาพแบตเตอรี่</li>
<li>ทำความสะอาดตัวเครื่องทั้งหมด</li>
<li>อัปเดตซอฟต์แวร์</li>
<li>Backup ข้อมูลการตั้งค่า</li>
</ul>

<h4>รายปี</h4>
<ul>
<li><strong>การสอบเทียบ (Calibration):</strong> ส่งสอบเทียบที่ห้องทดสอบที่ได้รับการรับรอง</li>
<li><strong>การตรวจสอบทั่วไป:</strong> ตรวจสอบทุกส่วนโดยช่างเทคนิค</li>
<li><strong>การเปลี่ยนอะไหล่:</strong> เปลี่ยนอะไหล่ที่สึกหรอ</li>
</ul>

<h3>ค่าใช้จ่ายในการบำรุงรักษา</h3>
<ul>
<li><strong>การสอบเทียบประจำปี:</strong> 30,000-50,000 บาท</li>
<li><strong>การบำรุงรักษาประจำปี:</strong> 20,000-30,000 บาท</li>
<li><strong>อะไหล่ฉุกเฉิน:</strong> 10,000-100,000 บาท (ขึ้นกับชิ้นส่วน)</li>
</ul>

<h2>บทสรุปและการติดต่อ</h2>
<p>กล้องเสียง Convergence Acoustic Camera ไม่ใช่เพียงแค่เครื่องมือวัด แต่เป็นเครื่องมือที่จะช่วยเปลี่ยนแปลงวิธีการทำงานของคุณ ช่วยให้คุณมองเห็นสิ่งที่มองไม่เห็นด้วยตา และแก้ไขปัญหาที่เคยใช้เวลานานวันได้ภายในไม่กี่นาที</p>

<p>ไม่ว่าคุณจะอยู่ในอุตสาหกรรมใดก็ตาม การลงทุนในกล้องเสียงจะให้ผลตอบแทนที่คุ้มค่า ทั้งในรูปของเวลา เงิน และคุณภาพผลิตภัณฑ์ที่ดีขึ้น</p>

<p><strong>Placid Asia</strong> เป็นตัวแทนจำหน่ายอย่างเป็นทางการของ Convergence Instruments ในประเทศไทย พร้อมให้บริการ:</p>
<ul>
<li>การสาธิตและทดลองใช้งานฟรี</li>
<li>การฝึกอบรมภาษาไทย</li>
<li>การสนับสนุนทางเทคนิคตลอดอายุการใช้งาน</li>
<li>การสอบเทียบและบำรุงรักษา</li>
<li>อะไหล่พร้อมส่ง</li>
</ul>

<p><strong>ติดต่อเราวันนี้เพื่อ:</strong></p>
<ul>
<li>นัดหมายการสาธิตที่บริษัทของคุณ (ฟรี)</li>
<li>ขอใบเสนอราคาที่เหมาะสมกับงบประมาณ</li>
<li>ปรึกษาเกี่ยวกับการเลือกรุ่นที่เหมาะสม</li>
<li>สอบถามข้อมูลเพิ่มเติม</li>
</ul>

<p><strong>ช่องทางการติดต่อ:</strong></p>
<ul>
<li><strong>โทรศัพท์:</strong> (+66) 0819641982</li>
<li><strong>LINE Official:</strong> @placid</li>
<li><strong>อีเมล:</strong> info@placid.asia</li>
<li><strong>เว็บไซต์:</strong> www.placid.asia</li>
<li><strong>Facebook:</strong> Placid Asia</li>
<li><strong>ที่อยู่:</strong> [ระบุที่อยู่บริษัท]</li>
</ul>

<p><em>อย่ารอช้า! โปรโมชันพิเศษสำหรับลูกค้าที่ติดต่อภายในเดือนนี้ รับส่วนลดพิเศษและของแถมมูลค่ามากกว่า 100,000 บาท</em></p>

<p><strong>มองเห็นเสียง แก้ปัญหาได้ - Convergence Acoustic Camera by Placid Asia</strong></p>
`;

async function main() {
  console.log('\n=== Adding More Thai Content for Acoustic Camera ===\n');
  
  const blog = await prisma.blogPost.findUnique({
    where: { slug: 'convergence-acoustic-camera-sound-source-localization' }
  });
  
  if (!blog) {
    console.log('Blog not found');
    return;
  }
  
  const currentEn = blog.content_en?.length || 0;
  const currentTh = blog.content_th?.length || 0;
  const currentTotal = currentEn + currentTh;
  const currentThPercent = currentTotal > 0 ? ((currentTh / currentTotal) * 100) : 0;
  
  console.log(`Current Thai: ${currentThPercent.toFixed(1)}%`);
  
  const newThaiContent = (blog.content_th || '') + '\n\n' + additionalContent;
  
  await prisma.blogPost.update({
    where: { slug: 'convergence-acoustic-camera-sound-source-localization' },
    data: { content_th: newThaiContent }
  });
  
  const newThLength = newThaiContent.length;
  const newTotal = currentEn + newThLength;
  const newThPercent = (newThLength / newTotal) * 100;
  
  console.log(`New Thai: ${newThPercent.toFixed(1)}%`);
  console.log(`Added: ${additionalContent.length} characters`);
  console.log(`Status: ${newThPercent >= 55 && newThPercent <= 65 ? '✓ TARGET MET' : newThPercent >= 50 ? '⚠ CLOSE' : '✗ NEEDS MORE'}`);
  
  console.log('\n✓ Done!\n');
}

main().finally(() => prisma.$disconnect());
