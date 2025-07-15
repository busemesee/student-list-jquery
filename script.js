$(function() {
  // 1) Statik JSON veri
  const studentData = [
    { name: 'Buse',   class: '10A' },
    { name: 'Özkan',  class: '11B' },
    { name: 'Ali',class: '12C' }
  ];

  const $list = $('#student-list');

  // 2) Listeyi yeniden çizmek için fonksiyon
  function renderList() {
    $list.empty();
    studentData.forEach((stu, idx) => {
      const $li = $(`
        <li data-index="${idx}">
          <span>${stu.name} — ${stu.class}</span>
          <button class="remove-btn">Sil</button>
        </li>
      `);

      // 3) Hover etkisi 
      $li.on('mouseenter', () => {
        $li.css('background', '#e8f4fd');
      });
      $li.on('mouseleave', () => {
        $li.css('background', '#f9f9f9');
      });

      // 4) Satıra tıklayınca renk değişimi
      $li.on('click', function(e) {
        if ($(e.target).hasClass('remove-btn')) return;
        // toggle edilmiş mi?
        if ($li.data('selected')) {
          $li.css('border', 'none');
          $li.data('selected', false);
        } else {
          $li.css('border', '2px solid #f1c40f');
          $li.data('selected', true);
        }
      });

      // 5) Silme butonu
      $li.find('.remove-btn').on('click', function(e) {
        e.stopPropagation();
        studentData.splice(idx, 1);
        renderList();
      });

      $list.append($li);
    });
  }

  // İlk render
  renderList();

  // 6) Form ile yeni öğrenci ekleme
  $('#student-form').on('submit', function(e) {
    e.preventDefault();
    const nameVal  = $('#name').val().trim();
    const classVal = $('#class').val().trim();
    if (!nameVal || !classVal) {
      alert('Hem isim hem de sınıf girmelisin.');
      return;
    }
    studentData.push({ name: nameVal, class: classVal });
    this.reset();
    renderList();
  });
});
