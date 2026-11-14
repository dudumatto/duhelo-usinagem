import { CNPJ, FULL_ADDRESS, LEGAL_NAME } from "../content";
import { ContentLayout } from "../components/ContentLayout";

export function PrivacyPage() {
  return (
    <ContentLayout>
      <article aria-labelledby="privacy-title">
        <header className="content-section content-hero">
          <div className="reading-width">
            <nav className="content-breadcrumb" aria-label="Caminho da página">
              <a href="/" className="text-link">Início</a><span aria-hidden="true">/</span><span>Política de privacidade</span>
            </nav>
            <h1 id="privacy-title">Política de privacidade</h1>
            <p className="blog-meta blog-byline">Atualizada em <time dateTime="2026-11-14">14/11/2026</time>.</p>
          </div>
        </header>
        <div className="content-section">
          <div className="blog-prose reading-width">
            <h2>Quem é o controlador</h2>
            <p>{LEGAL_NAME}, CNPJ {CNPJ}, com endereço em {FULL_ADDRESS}.</p>
            <h2>Dados que recebemos e para que os usamos</h2>
            <p>O site não tem formulário de contato e não recebe pagamentos. Os botões encaminham para WhatsApp, telefone ou e-mail. Se você entrar em contato, podemos receber seus dados de contato, mensagens e arquivos que você enviar, como desenhos ou fotos de peças, para atender à solicitação e preparar o orçamento. Os dados de pagamento são tratados fora do site para processar os pagamentos.</p>
            <p>Quando a medição está habilitada e você aceita os cookies de métricas, usamos o Google Analytics 4 para contar visitas às páginas, cliques de contato e rolagem até 75% dos artigos. Os eventos do site usam a página visitada e, quando aplicável, a posição do botão e os rótulos de campanhas cadastradas. As métricas não incluem dados de pagamento, mensagens nem anexos.</p>
            <h2>Cookies e atribuição de campanhas</h2>
            <p>O navegador guarda sua preferência de cookies. A medição e seus cookies só são ativados após o aceite. Você pode recusar ou alterar a decisão em “Preferências de cookies” no rodapé quando a medição estiver disponível. Os rótulos de campanhas reconhecidas podem ficar no armazenamento da sessão da aba para associar a origem da visita às interações durante a navegação.</p>
            <h2>Base legal</h2>
            <p>A medição por Google Analytics 4 depende do seu consentimento.</p>
            {/* Revisão jurídica das demais bases legais suspensa a pedido da empresa. */}
            <h2>Serviços externos</h2>
            <p>Ao usar WhatsApp ou e-mail, o serviço de comunicação escolhido trata os dados necessários para entregar a mensagem, conforme as regras da plataforma.</p>
            <p>Com seu consentimento, o Google Analytics 4 processa os eventos de medição e informações técnicas do navegador para gerar relatórios de uso do site. Consulte a <a href="https://policies.google.com/technologies/partner-sites?hl=pt-BR">descrição de como o Google usa dados de sites parceiros</a>.</p>
            {/* Revisão jurídica da transferência internacional suspensa. */}
            <h2>Por quanto tempo guardamos os dados</h2>
            <p>A Duhelo costuma guardar orçamentos por cerca de três meses. As conversas ficam nos canais de atendimento até serem apagadas, sem prazo fixo definido pela empresa.</p>
            <p>Na rotina da empresa, notas fiscais de compra e de saída e registros de impostos são guardados por até cinco anos. Folhas de pagamento e Guias da Previdência Social (GPS) são guardadas por até dez anos.</p>
            <p>Guardamos os anexos recebidos no atendimento e os comprovantes de pagamento. Os comprovantes servem para verificar o pagamento se houver divergências.</p>
            <p>No Google Analytics 4, a configuração de retenção é de dois meses para dados de eventos e quatorze meses para dados de usuários. Para dados de usuários, o prazo é renovado quando há nova atividade. Essa configuração não se aplica à maioria dos relatórios agregados padrão.</p>
            <h2>Seus direitos e como solicitar</h2>
            <p>Nos termos do art. 18 da LGPD, você pode pedir confirmação e acesso aos dados, correção, portabilidade, informação sobre compartilhamento, anonimização, bloqueio ou eliminação, conforme o caso. Se houver tratamento com base no consentimento, você pode pedir informações sobre a recusa, revogar o consentimento e solicitar a eliminação nos casos previstos em lei.</p>
            <p>Para assuntos de privacidade, escreva para <a href="mailto:silasmattosduhelo@gmail.com">silasmattosduhelo@gmail.com</a>. Se precisar encaminhar uma petição após procurar a Duhelo, consulte a <a href="https://www.gov.br/anpd/pt-br/canais_atendimento/cidadao-titular-de-dados/denuncia-peticao-de-titular-referente-lgpd">orientação da ANPD</a>.</p>
            {/* A designação do responsável pelo atendimento de privacidade segue suspensa. */}
          </div>
        </div>
      </article>
    </ContentLayout>
  );
}
